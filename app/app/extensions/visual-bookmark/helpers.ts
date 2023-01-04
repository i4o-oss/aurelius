import { Plugin, PluginKey } from 'prosemirror-state'
import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import type { Slice } from 'prosemirror-model'

export const fetchMetadata = async (url: string) => {
	const response = await fetch(`/oembed?url=${encodeURIComponent(url)}`)
	const data = await response.json()

	return data
}

export function visualBookmarkPlugin(editor: Editor, name: string) {
	const handler = async (view: EditorView, slice: Slice) => {
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

		const { oembed } = await fetchMetadata(textContent)
		const { metadata } = oembed

		if (metadata) {
			editor
				.chain()
				.focus()
				.insertContentAt(pos.before(), [
					{
						type: name,
						attrs: {
							url: metadata?.url,
							title: metadata?.title,
							description: metadata?.description,
							icon: metadata?.icon,
							thumbnail: metadata?.thumbnail,
							author: metadata?.author,
							publisher: metadata?.publisher,
						},
					},
				])
				.run()

			return true
		} else {
			return false
		}
	}

	return new Plugin({
		key: new PluginKey<any>('handlePasteURL'),
		props: {
			// @ts-ignore
			handlePaste: (view, event, slice) => {
				return handler(view, slice)
			},
		},
	})
}
