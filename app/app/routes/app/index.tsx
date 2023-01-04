import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { Button, Dropdown, Switch } from '@aurelius/ui'
import {
	FileTextIcon,
	HamburgerMenuIcon,
	SunIcon,
	MoonIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons'
import { Folder as FolderIcon } from 'react-feather'
import { Theme, useTheme } from '~/utils/theme-provider'
import TipTap from '~/components/writer/tiptap'
import Footer from '~/components/writer/footer'

function MainMenu() {
	const [theme, setTheme] = useTheme()

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		)
	}

	const menuItems = [
		{
			label: 'New',
			type: 'submenu',
			submenu: [
				{
					icon: <FileTextIcon className='h-4 w-4' />,
					label: 'Post',
					shortcut: 'Ctrl + N',
					type: 'item',
				},
				{
					icon: <Pencil1Icon className='h-4 w-4' />,
					label: 'Writing Session',
					shortcut: 'Ctrl + W',
					type: 'item',
				},
			],
		},
		{
			icon: <FolderIcon className='h-4 w-4' />,
			label: 'Open',
			onSelect: () => {
				console.log('Open')
			},
			shortcut: 'Ctrl + O',
			type: 'item',
		},
		{
			type: 'separator',
		},
		{
			icon: <MoonIcon className='h-4 w-4' />,
			label: (
				<div className='flex items-center justify-between'>
					<span>Dark Mode</span>
					<Switch
						defaultChecked={theme === Theme.DARK}
						icon={
							theme === Theme.LIGHT ? (
								<SunIcon className='w-2 h-2 text-brand-900' />
							) : (
								<MoonIcon className='w-2 h-2 text-brand-900' />
							)
						}
						name='dark-mode-toggle'
						onCheckedChange={toggleTheme}
					/>
				</div>
			),
			onSelect: () => {
				toggleTheme()
			},
			type: 'item',
		},
	]

	return (
		<div className='absolute top-0 left-0'>
			<Dropdown
				align='start'
				// @ts-ignore
				items={menuItems}
				trigger={
					<Button className='w-10 h-10' padding='p-0'>
						<HamburgerMenuIcon />
					</Button>
				}
			/>
		</div>
	)
}

interface EditorProps {
	content: string
	setContent: Dispatch<SetStateAction<string>>
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	setWordCount: Dispatch<SetStateAction<number>>
}

function Editor(props: EditorProps) {
	const { content, setContent, title, setTitle, setWordCount } = props

	return (
		<section className='flex h-full w-full flex-grow flex-col items-center justify-start'>
			<div className='flex h-full w-full flex-col items-center justify-start space-y-4 py-16'>
				<div className='w-full max-w-3xl'>
					<input
						className='h-24 w-full bg-transparent text-5xl font-semibold text-white focus:outline-none'
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Title'
						type='text'
						value={title}
					/>
				</div>
				<TipTap
					content={content}
					setContent={setContent}
					setTitle={setTitle}
					setWordCount={setWordCount}
				/>
			</div>
		</section>
	)
}

export default function Index() {
	const [content, setContent] = useState('')
	const [focusMode, setFocusMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [postId, setPostId] = useState('')
	const [title, setTitle] = useState('')
	const [wordCount, setWordCount] = useState(0)

	return (
		<div className='relative flex w-full h-full flex-col items-center justify-start'>
			<MainMenu />
			<Editor
				content={content}
				setContent={setContent}
				title={title}
				setTitle={setTitle}
				setWordCount={setWordCount}
			/>
			<Footer
				focusMode={focusMode}
				isSaving={isSaving}
				wordCount={wordCount}
			/>
		</div>
	)
}
