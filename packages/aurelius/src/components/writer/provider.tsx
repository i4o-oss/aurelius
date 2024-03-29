import type { Editor } from '@tiptap/react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext } from 'react'
import type {
	SettingsData,
	Theme,
	TitleAlignment,
	ToolbarMode,
	WritingSession,
	WritingSessionGoal,
} from '../../types'

export const AureliusContext = createContext({})

export interface AureliusProviderData {
	author?: string
	setAuthor?: Dispatch<SetStateAction<string>>
	content?: string
	setContent?: (html: string) => void
	editor?: Editor | null
	focusMode?: boolean
	setFocusMode?: Dispatch<SetStateAction<boolean>>
	footer?: string
	setFooter?: Dispatch<SetStateAction<string>>
	isMusicPlaying?: boolean
	setIsMusicPlaying?: Dispatch<SetStateAction<boolean>>
	isSaving?: boolean
	setIsSaving?: Dispatch<SetStateAction<boolean>>
	notifyOnSessionEnd?: boolean
	setNotifyOnSessionEnd?: Dispatch<SetStateAction<boolean>>
    onResetEditorClick?: (state: boolean) => void
	post?: { title: string; content: string, wordCount: number }
	settings?: SettingsData
	sessionData?: WritingSession | null
	setSessionData?: Dispatch<SetStateAction<WritingSession | null>>
	sessionFocusMode?: boolean
	setSessionFocusMode?: Dispatch<SetStateAction<boolean>>
	sessionGoal?: WritingSessionGoal
	setSessionGoal?: Dispatch<SetStateAction<WritingSessionGoal>>
	sessionMusic?: boolean
	setSessionMusic?: Dispatch<SetStateAction<boolean>>
	sessionTarget?: number
	setSessionTarget?: Dispatch<SetStateAction<number>>
	showAboutDialog?: boolean
	setShowAboutDialog?: Dispatch<SetStateAction<boolean>>
	showExportImageDialog?: boolean
	setShowExportImageDialog?: Dispatch<SetStateAction<boolean>>
	showHelpDialog?: boolean
	setShowHelpDialog?: Dispatch<SetStateAction<boolean>>
	showNewSessionDialog?: boolean
	setShowNewSessionDialog?: Dispatch<SetStateAction<boolean>>
	showResetAlert?: boolean
	setShowResetAlert?: Dispatch<SetStateAction<boolean>>
	showSessionEndToast?: boolean
	setShowSessionEndToast?: Dispatch<SetStateAction<boolean>>
	showSessionRecapDialog?: boolean
	setShowSessionRecapDialog?: Dispatch<SetStateAction<boolean>>
	showSettingsDialog?: boolean 
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	showSplashScreenDialog?: boolean
	setShowSplashScreenDialog?: Dispatch<SetStateAction<boolean>>
	showWritingPaths?: boolean
	setShowWritingPaths?: Dispatch<SetStateAction<boolean>>
	theme?: Theme
	toggleTheme?: () => void
	title?: string
	setTitle?: Dispatch<SetStateAction<string>>
	titleAlignment?: TitleAlignment
	setTitleAlignment?: Dispatch<SetStateAction<TitleAlignment>>
    toolbarMode?: ToolbarMode
	user?: any
	watermark?: boolean
	setWatermark?: Dispatch<SetStateAction<boolean>>
	wordCount?: number
	setWordCount?: Dispatch<SetStateAction<number>>
}

interface AureliusProviderProps {
	children: ReactNode
	data: AureliusProviderData
}

export default function AureliusProvider({
	children,
	data,
}: AureliusProviderProps) {
	return (
		<AureliusContext.Provider value={data}>
			{children}
		</AureliusContext.Provider>
	)
}
