import { Plugin, PluginKey } from 'prosemirror-state'
import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import type { Slice } from 'prosemirror-model'

export const youtubeRegExp =
	/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/g

export const generateEmbedUrl = (url: string) => {
	const match = youtubeRegExp.exec(url)
	const videoId = match ? match?.[1] : false
	return videoId ? `https://youtube.com/embed/${videoId}` : ''
}

export function youtubeEmbedPlugin(editor: Editor, name: string) {
	const handler = (view: EditorView, slice: Slice) => {
		if (slice.content.childCount > 1) return false

		const { state } = view
		const { selection } = state
		const { empty } = selection

		if (!empty) return false

		const pos = selection.$head
		const node = pos.node()

		if (node.content.size > 0) return false

		let textContent = ''

		slice.content.forEach((node) => {
			textContent += node.textContent
		})

		const src = generateEmbedUrl(textContent)

		if (src) {
			editor
				.chain()
				.focus()
				.insertContentAt(pos.before(), [
					{
						type: name,
						attrs: { src, provider: 'youtube' },
					},
				])
				.run()

			return true
		} else {
			return false
		}
	}

	return new Plugin({
		key: new PluginKey<any>('handlePasteVideoURL'),
		props: {
			handlePaste: (view, event, slice) => {
				return handler(view, slice)
			},
		},
	})
}
