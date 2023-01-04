import { Image } from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'

// inspired by: https://github.com/ueberdosis/tiptap/issues/1283
export default Image.extend({
	name: 'super-image',

	addOptions() {
		return {
			...this.parent?.(),
			sizes: ['small', 'medium', 'large'],
		}
	},

	addAttributes() {
		return {
			// @ts-ignore
			...Image.config.addAttributes(),
			size: {
				default: 'small',
				rendered: false,
			},
		}
	},

	addCommands() {
		return {
			setImage:
				(options) =>
				({ tr, commands }) => {
					// @ts-ignore
					if (tr.selection?.node?.type?.name === 'super-image') {
						return commands.updateAttributes('super-image', options)
					} else {
						return commands.insertContent({
							type: this.name,
							attrs: options,
						})
					}
				},
		}
	},

	renderHTML({ node, HTMLAttributes }) {
		HTMLAttributes.class = ' super-image-' + node.attrs.size

		return [
			'img',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		]
	},
})
