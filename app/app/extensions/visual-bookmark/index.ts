import type { Editor } from '@tiptap/core'
import { Node } from '@tiptap/core'
import { fetchMetadata, visualBookmarkPlugin } from './helpers'

const VisualBookmark = Node.create({
	name: 'visual-bookmark',
	group: 'block',
	selectable: true,
	draggable: false,
	atom: true,

	// @ts-ignore
	parseHTML() {
		return [
			{
				tag: 'a',
				getAttrs: (element: HTMLElement) => {
					const a = element.querySelector('a')

					if (!a) return false

					const href = a.getAttribute('href')

					if (!href) return false

					return {
						url: href,
					}
				},
			},
		]
	},

	addAttributes() {
		return {
			url: {
				default: null,
			},
			title: {
				default: null,
			},
			description: {
				default: null,
			},
			thumbnail: {
				default: null,
			},
			icon: {
				default: null,
			},
			author: {
				default: null,
			},
			publisher: {
				default: null,
			},
		}
	},

	renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
		return [
			'figure',
			{
				class: 'w-full rounded-lg overflow-hidden border border-gray-300 my-4',
			},
			[
				'a',
				{
					class: 'w-full',
					href: HTMLAttributes.url,
					target: '_blank',
				},
				// content
				[
					'div',
					{ class: 'w-full h-48 flex font-sans' },
					// title and description
					[
						'div',
						{
							class: 'w-3/5 h-full flex flex-col items-start justify-between p-4',
						},
						[
							'div',
							{
								class: 'w-full flex flex-col items-start justify-start space-y-2',
							},
							[
								'p',
								{ class: 'text-base font-bold text-gray-100' },
								HTMLAttributes.title,
							],
							[
								'p',
								{ class: 'text-xs text-gray-300' },
								HTMLAttributes?.description ?? '',
							],
						],
						[
							'div',
							{ class: 'flex space-x-2' },
							[
								'img',
								{ class: 'w-4 h-4', src: HTMLAttributes?.icon },
							],
							[
								'span',
								{
									class: 'flex text-xs text-gray-100 font-semibold',
								},
								`${HTMLAttributes?.publisher ?? ''} ${
									HTMLAttributes?.author
										? `• ${HTMLAttributes.author}`
										: ''
								}`,
							],
						],
					],
					// image
					[
						'div',
						{ class: 'w-2/5 h-full' },
						[
							'img',
							{
								class: 'w-full h-full object-cover',
								src: HTMLAttributes?.thumbnail,
							},
						],
					],
				],
			],
		]
	},

	addProseMirrorPlugins() {
		return [visualBookmarkPlugin(this.editor, this.name)]
	},

	// @ts-ignore
	addCommands() {
		return {
			insertBookmark:
				(options: any) =>
				async ({ chain, editor }: { chain: any; editor: Editor }) => {
					const { url } = options

					const { oembed } = await fetchMetadata(url)
					const { metadata } = oembed

					if (metadata) {
						const { selection } = editor.state
						const pos = selection.$head

						return chain()
							.insertContentAt(pos.before(), [
								{
									type: this.name,
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
					}

					return false
				},
		}
	},
})

export default VisualBookmark
