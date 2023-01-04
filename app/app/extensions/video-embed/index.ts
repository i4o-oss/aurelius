import type { Editor } from '@tiptap/core'
import { Node } from '@tiptap/core'
import { generateEmbedUrl, youtubeEmbedPlugin } from './helpers'

// code shamelessly inspired by these two:
// https://www.codemzy.com/blog/tiptap-video-embed-extension
// https://gist.github.com/forresto/733db674953fb7dd4f46ab131137423d
const VideoEmbed = Node.create({
	name: 'video-embed',
	group: 'block',
	selectable: true,
	draggable: false,
	atom: true,

	// @ts-ignore
	parseHTML() {
		return [
			{
				tag: 'div',
				getAttrs: (element: HTMLElement) => {
					const videoElement = element.querySelector('iframe')

					if (!videoElement) return false

					const src = videoElement.getAttribute('src')

					if (!src) return false

					return {
						src,
						provider: 'youtube',
					}
				},
			},
			{
				tag: 'iframe',
			},
		]
	},

	addAttributes() {
		return {
			src: {
				default: null,
			},
			provider: {
				default: 'youtube',
			},
		}
	},

	renderHTML({ HTMLAttributes }: { HTMLAttributes: any }) {
		return [
			'div',
			{ class: 'w-full aspect-w-16 aspect-h-9 relative' },
			[
				'iframe',
				{
					class: 'w-[768px] h-[432px]',
					src: HTMLAttributes.src,
				},
			],
		]
	},

	addProseMirrorPlugins() {
		return [youtubeEmbedPlugin(this.editor, this.name)]
	},

	// @ts-ignore
	addCommands() {
		return {
			insertEmbed:
				(options: any) =>
				({ chain, editor }: { chain: any; editor: Editor }) => {
					const { url } = options
					const src = generateEmbedUrl(url)
					if (src) {
						const { selection } = editor.state
						const pos = selection.$head

						return chain()
							.insertContentAt(pos.before(), [
								{
									type: this.name,
									attrs: { src, provider: 'youtube' },
								},
							])
							.run()
					}

					return false
				},
		}
	},
})

export default VideoEmbed
