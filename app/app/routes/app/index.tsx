import { Theme, useTheme } from '~/utils/theme-provider'
import { Button, Dropdown, Switch } from '@aurelius/ui'
import {
	FileTextIcon,
	HamburgerMenuIcon,
	SunIcon,
	MoonIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons'
import { Folder as FolderIcon } from 'react-feather'

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
export default function Index() {
	return (
		<div className='relative flex w-full text-white text-xl font-semibold'>
			<MainMenu />
		</div>
	)
}
