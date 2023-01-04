import type { FC, KeyboardEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
	CodeIcon,
	FontBoldIcon,
	FontItalicIcon,
	Link2Icon,
	LinkBreak2Icon,
	QuoteIcon,
} from '@radix-ui/react-icons'
import { Button, Toolbar } from '@aurelius/ui'

interface EditorToolbarProps {
	editor: any | null
}

const EditorToolbar: FC<EditorToolbarProps> = ({ editor }) => {
	const linkInputRef = useRef<HTMLInputElement>(null)
	const [link, setLink] = useState('')
	const [toggleLink, setToggleLink] = useState(false)

	useEffect(() => {
		if (toggleLink) {
			// @ts-ignore
			linkInputRef?.current?.focus()
		}
	}, [toggleLink])

	const linkChangeHandler: KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			editor
				?.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: link, target: '_blank' })
				.run()
			setLink('')
			setToggleLink(false)
		}
	}

	const toolbarOptions = [
		{
			value: 'bold',
			label: 'Bold',
			node: <FontBoldIcon />,
			onClick: () => editor?.chain().focus().toggleBold().run(),
		},
		{
			value: 'italic',
			label: 'Italic',
			node: <FontItalicIcon />,
			onClick: () => editor?.chain().focus().toggleItalic().run(),
		},
		{
			value: 'heading',
			level: 2,
			label: 'Heading 2',
			node: <span className='text-sm font-semibold'>H</span>,
			onClick: () =>
				editor?.chain().focus().toggleHeading({ level: 2 }).run(),
		},
		{
			value: 'heading',
			level: 3,
			label: 'Heading 3',
			node: <span className='text-[12px] font-semibold'>H</span>,
			onClick: () =>
				editor?.chain().focus().toggleHeading({ level: 3 }).run(),
		},
		{
			value: 'quote',
			label: 'Quote',
			node: <QuoteIcon />,
			onClick: () => editor?.chain().focus().toggleBlockquote().run(),
		},
		{
			value: 'link',
			label: 'Link',
			node: <Link2Icon />,
			onClick: () => setToggleLink(true),
		},
		{
			value: 'code',
			label: 'Code',
			node: <CodeIcon />,
			onClick: () => editor?.chain().focus().toggleCode().run(),
		},
	]

	return (
		<Toolbar
			ariaLabel='Text Formatting Options'
			className='rounded-md bg-gray-800'
		>
			<div className='flex h-12 items-center justify-center space-x-1 overflow-hidden rounded-md p-2 shadow-md'>
				{toggleLink ? (
					<div className='flex h-full w-full items-center justify-center space-x-2'>
						<input
							className='h-full w-auto bg-transparent px-2 py-1 text-white outline-white'
							onBlur={() => {
								if (!editor?.getAttributes('link').href) {
									setToggleLink(false)
								}
							}}
							onChange={(e) => setLink(e.target.value)}
							onKeyUp={linkChangeHandler}
							ref={linkInputRef}
							type='text'
							value={link || editor?.getAttributes('link').href}
						/>
						{editor?.getAttributes('link').href && (
							<Button
								aria-label='Unlink'
								bg='bg-gray-300'
								className='flex h-full w-8 items-center justify-center rounded-md'
								onClick={() => {
									editor?.chain().focus().unsetLink().run()
									setToggleLink(false)
								}}
								padding='p-0'
								textColor='text-black'
							>
								<LinkBreak2Icon />
							</Button>
						)}
					</div>
				) : (
					toolbarOptions.map((option, index) => (
						<Button
							key={index}
							aria-label={option.label}
							bg='bg-transparent'
							className={`flex h-8 w-8 items-center justify-center rounded-md ${
								editor?.isActive(option.value, {
									level: option?.level,
								})
									? 'bg-brand-100 font-semibold text-brand-800'
									: ''
							}`}
							onClick={option.onClick}
							padding='p-0'
							textColor='text-white'
						>
							{option.node}
						</Button>
					))
				)}
			</div>
		</Toolbar>
	)
}

export default EditorToolbar
