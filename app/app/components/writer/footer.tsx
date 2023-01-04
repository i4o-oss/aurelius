import React, { useState } from 'react'
import { default as _ReactPlayer } from 'react-player/youtube'
import type { ReactPlayerProps } from 'react-player/types/lib'
import { Music, Pause } from 'react-feather'
import { Button } from '@aurelius/ui'
import { MUSIC_STATIONS } from '~/utils/constants'

// fixes react-player typescript issue
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

interface FooterProps {
	focusMode: boolean
	isSaving?: boolean
	wordCount: number
}

export default function Footer(props: FooterProps) {
	const { focusMode, isSaving, wordCount } = props
	const [isMusicPlaying, setIsMusicPlaying] = useState(false)

	return (
		<div
			className={`fixed bottom-0 left-0 flex h-12 w-full items-center justify-between px-6 `}
		>
			<div
				className={`flex items-center justify-start transition-all duration-200 hover:opacity-100 ${
					focusMode ? 'opacity-5' : 'opacity-100'
				}`}
			>
				<span className='text-sm text-gray-500'>{`${wordCount} words`}</span>
				{isSaving && (
					<div className='flex items-center justify-center px-4'>
						<svg
							className='-ml-1 mr-2 h-4 w-4 animate-spin text-gray-500'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								className='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							/>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							/>
						</svg>
						<span className='text-sm text-gray-500'>Saving...</span>
					</div>
				)}
			</div>
			<div
				className={`flex items-center justify-start transition-all duration-200 hover:opacity-100 ${
					focusMode ? 'opacity-5' : 'opacity-100'
				}`}
			>
				{isMusicPlaying ? (
					<Button
						bg='bg-transparent hover:bg-gray-900'
						className='flex h-8 w-8 items-center justify-center'
						onClick={() => setIsMusicPlaying(false)}
						padding='px-0 py-4'
					>
						<Pause width={16} height={16} className='text-white' />
					</Button>
				) : (
					<Button
						bg='bg-transparent hover:bg-gray-900'
						className='flex h-8 w-8 items-center justify-center'
						onClick={() => setIsMusicPlaying(true)}
						padding='px-0 py-4'
					>
						<Music width={16} height={16} className='text-white' />
					</Button>
				)}
				<ReactPlayer
					playing={isMusicPlaying}
					url={MUSIC_STATIONS.LOFI_GIRL_FOCUS}
					width='0px'
					height='0px'
				/>
			</div>
		</div>
	)
}
