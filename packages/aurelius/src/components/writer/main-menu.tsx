import { useContext } from 'react'
import { Dropdown, IconButton, Switch } from '@i4o/catalystui'
import {
	Crosshair2Icon,
	DashboardIcon,
	DownloadIcon,
	EnterIcon,
	ExitIcon,
	FileIcon,
	FileTextIcon,
	HamburgerMenuIcon,
	ImageIcon,
	InstagramLogoIcon,
	// InfoCircledIcon,
	MixerHorizontalIcon,
	MoonIcon,
	Pencil1Icon,
	RocketIcon,
	QuestionMarkCircledIcon,
	StarFilledIcon,
	SunIcon,
	TrashIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { AureliusContext, AureliusProviderData } from './provider'
import { AmplitudeEventType, Theme } from '../../types'
import { Form } from '@remix-run/react'
import { sendAmplitudeEvent } from '../../helpers'

interface MainMenuProps {
	downloadFile: () => void
}

export default function MainMenu(props: MainMenuProps) {
	const {
		content,
		focusMode,
		onResetEditorClick,
        showHelpDialog,
		setFocusMode,
        setShowHelpDialog,
		setShowExportImageDialog,
		setShowNewSessionDialog,
		setShowSettingsDialog,
		theme,
		toggleTheme,
		user,
	} = useContext<AureliusProviderData>(AureliusContext)

	let userRelatedItems = user
		? [
				{
					label: 'Dashboard',
					icon: <DashboardIcon />,
					link: '/dashboard',
				},
				{
					label: 'Plus',
					icon: <RocketIcon />,
					link: '/plus',
					openLinkInNewTab: true,
				},
				{
					label: (
						<Form action='/logout' method='post'>
							<button
								className='flex h-full w-full items-center justify-start'
								type='submit'
							>
								Logout
							</button>
						</Form>
					),
					icon: <ExitIcon />,
					onSelect: (e: Event) => e.preventDefault(),
				},
		  ]
		: [
				{
					label: 'Dashboard',
					icon: <DashboardIcon />,
					link: '/dashboard',
				},
				{
					label: 'Sign Up',
					icon: <StarFilledIcon />,
					link: '/login',
				},
				{
					label: 'Log In',
					icon: <EnterIcon />,
					link: '/login',
				},
		  ]

	const dropdownItems = [
		{
			label: 'New',
			icon: <FileIcon />,
			submenu: [
				{
					label: 'Post',
					icon: <FileTextIcon />,
					onSelect: () => {
						onResetEditorClick?.(true)
						if (!content) {
							sendAmplitudeEvent(AmplitudeEventType.POST_CREATED)
						}
					},
					shortcut: 'Alt + N',
				},
				{
					label: 'Writing Session',
					icon: <Pencil1Icon />,
					onSelect: () => {
						setShowNewSessionDialog?.(true)
						sendAmplitudeEvent(
							AmplitudeEventType.WRITING_SESSION_CLICKED
						)
					},
					shortcut: 'Alt + W',
				},
			],
			type: 'submenu',
		},
		// {
		// 	label: 'Open',
		// 	icon: (
		// 		<svg
		// 			xmlns='http://www.w3.org/2000/svg'
		// 			viewBox='0 0 24 24'
		// 			fill='none'
		// 			stroke='currentColor'
		// 			strokeWidth='2'
		// 			strokeLinecap='round'
		// 			strokeLinejoin='round'
		// 		>
		// 			<path d='M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z'></path>
		// 		</svg>
		// 	),
		// },
		{
			label: 'Export As',
			icon: <DownloadIcon />,
			type: 'submenu',
			submenu: [
				// {
				// 	label: 'Export to PDF',
				// 	icon: (
				// 		<svg
				// 			xmlns='http://www.w3.org/2000/svg'
				// 			viewBox='0 0 448 512'
				// 			fill='currentColor'
				// 			stroke='currentColor'
				// 		>
				// 			<path d='M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zm96-112h24c30.9 0 56 25.1 56 56s-25.1 56-56 56h-8v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm24 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v48h8zm72-64c0-8.8 7.2-16 16-16h24c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H272c-8.8 0-16-7.2-16-16V368zm32 112h8c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16h-8v96zm96-128h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H400v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H400v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368c0-8.8 7.2-16 16-16z' />
				// 		</svg>
				// 	),
				// },
				{
					label: 'Image',
					icon: <ImageIcon />,
					onSelect: () => setShowExportImageDialog?.(true),
					shortcut: 'Alt + I',
				},
				{
					label: 'Markdown',
					icon: (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z'></path>
							<polyline points='14 2 14 8 20 8'></polyline>
							<path d='M12 18v-6'></path>
							<path d='m9 15 3 3 3-3'></path>
						</svg>
					),
					onSelect: props.downloadFile,
					shortcut: 'Alt + D',
				},
			],
		},
		{
			label: 'Focus Mode',
			icon: <Crosshair2Icon />,
			onSelect: () => setFocusMode?.(!focusMode),
			shortcut: 'Alt + M',
		},
		{
			label: 'Reset Editor',
			icon: <TrashIcon />,
			onSelect: () => onResetEditorClick?.(true),
			shortcut: 'Alt + R',
		},
		{
			label: 'Preferences',
			icon: <MixerHorizontalIcon />,
			onSelect: () => setShowSettingsDialog?.(true),
			shortcut: 'Alt + S',
		},
		{ type: 'separator' },
		{
			label: 'Blog',
			icon: <Pencil1Icon />,
			link: '/blog',
			openLinkInNewTab: true,
		},
		{
			label: 'Twitter',
			icon: <TwitterLogoIcon />,
			link: 'https://twitter.com/aurelius_ink',
			openLinkInNewTab: true,
		},
		{
			label: 'Instagram',
			icon: <InstagramLogoIcon />,
			link: 'https://instagram.com/aurelius_ink',
			openLinkInNewTab: true,
		},
		{
			label: 'Help',
			icon: <QuestionMarkCircledIcon />,
            onSelect: () => setShowHelpDialog?.(!showHelpDialog),
            shortcut: 'Alt + ?'
		},
		{ type: 'separator' },
		{
			label: (
				<div className='au-flex au-cursor-pointer au-items-center au-justify-between'>
					<label className='au-cursor-pointer'>Theme</label>
					{/* Wrapping the switch in a div so I can use the onclick without having to add it to catalyst.
                        This will prevent event bubbling and triggering toggletheme twice.
                        Which was why it wasn't working when clicking directly on the switch.. */}
					<div
						// @ts-ignore
						onClick={(e: MouseEvent) => e.preventDefault()}
					>
						<Switch
							defaultChecked={theme === Theme.DARK}
							name='theme-toggle-switch'
							onCheckedChange={toggleTheme}
						/>
					</div>
				</div>
			),
			icon: theme === Theme.DARK ? <SunIcon /> : <MoonIcon />,
			onSelect: () => toggleTheme?.(),
		},
		{ type: 'separator' },
		...userRelatedItems,
	]

	return (
		<Dropdown
			align='start'
			// @ts-ignore
			items={dropdownItems}
			trigger={
				<IconButton
					ariaLabel='Main Menu Dropdown'
					className='h-10 w-10'
					icon={
						<HamburgerMenuIcon className='au-placeholder-primary-foreground' />
					}
				/>
			}
		/>
	)
}
