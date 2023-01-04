import type { Dispatch, FC, SetStateAction } from 'react'
import { useRef } from 'react'
import {
	useEditor,
	BubbleMenu,
	EditorContent,
	FloatingMenu,
} from '@tiptap/react'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import SuperImage from '~/extensions/super-image'
import VideoEmbed from '~/extensions/video-embed'
import EditorToolbar from '~/components/writer/editor-toolbar'
import ImageToolbar from '~/components/writer/image-toolbar'
import EditorFloatingMenu from '~/components/writer/editor-floating-menu'
import VisualBookmark from '~/extensions/visual-bookmark'
import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {}

type TipTapProps = {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
}

const TipTap: FC<TipTapProps> = ({
	content,
	setContent,
	setTitle,
	setWordCount,
}) => {
	const fileUploadInputRef = useRef(null)

	const editor = useEditor({
		content,
		editorProps: {
			attributes: {
				class: '',
			},
		},
		extensions: [
			BubbleMenuExt.configure({
				tippyOptions: {
					arrow: true,
				},
			}),
			SuperImage,
			VideoEmbed,
			VisualBookmark,
			Link.configure({ linkOnPaste: true, openOnClick: false }),
			Placeholder.configure({
				placeholder: 'Start writing...',
			}),
			// @ts-ignore
			StarterKit.configure({
				heading: {
					levels: [2, 3],
				},
			}),
		],
		onUpdate({ editor }) {
			const html = editor.getHTML()
			const contentText = editor?.state?.doc?.textContent
			const wordCount = contentText?.split(' ').length
			setContent(html)
			setWordCount(wordCount)
		},
	})

	let activeToolbar = null
	if (editor?.isActive('super-image')) {
		activeToolbar = <ImageToolbar editor={editor} />
	} else if (
		!editor?.isActive('super-image') &&
		!editor?.isActive('video-embed') &&
		!editor?.isActive('visual-bookmark')
	) {
		activeToolbar = <EditorToolbar editor={editor} />
	}

	return (
		<>
			<div className='editor-wrapper flex h-auto min-h-max w-full items-start justify-center pb-12'>
				{editor && (
					<>
						<BubbleMenu editor={editor}>{activeToolbar}</BubbleMenu>
						<FloatingMenu editor={editor}>
							<EditorFloatingMenu
								editor={editor}
								fileUploadInputRef={fileUploadInputRef}
							/>
							<input
								accept='image/*'
								className='hidden'
								multiple={false}
								onChange={() => console.log('change')}
								ref={fileUploadInputRef}
								type='file'
							/>
						</FloatingMenu>
					</>
				)}
				<EditorContent editor={editor} />
			</div>
		</>
	)
}

export default TipTap
