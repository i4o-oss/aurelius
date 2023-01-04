import { PauseIcon, PlayIcon, SquareIcon } from '@radix-ui/react-icons'
import { Button } from '@aurelius/ui'
import { useTimer, useStopwatch } from 'react-timer-hook'
import { padZeroes } from '~/utils/helpers'

interface Props {
	expiryTimestamp: Date
}

export default function Timer(props: Props) {
	const { expiryTimestamp } = props
	const {
		seconds: swSeconds,
		minutes: swMinutes,
		hours: swHours,
		isRunning: isSwRunning,
		start: swStart,
		pause: swPause,
	} = useStopwatch({ autoStart: false })
	const { seconds, minutes, hours, isRunning, pause, resume } = useTimer({
		autoStart: true,
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	})

	const resumeSession = () => {
		if (isRunning) {
			resume()
		} else {
			swStart()
		}

		// if (music) {
		// 	music.pause()
		// }
	}

	const pauseSession = () => {
		if (isRunning) {
			pause()
		} else {
			swPause()
		}

		// if (music) {
		// 	music.play()
		// }
	}

	return (
		<div className='flex items-center space-x-4'>
			{isRunning || isSwRunning ? (
				<Button
					bg='bg-transparent hover:bg-gray-900'
					className='flex h-8 w-8 items-center justify-center'
					padding='p-0'
					onClick={pauseSession}
					tooltip='Pause Session'
				>
					<PauseIcon className='text-white' />
				</Button>
			) : (
				<Button
					bg='bg-transparent hover:bg-gray-900'
					className='flex h-8 w-8 items-center justify-center'
					padding='p-0'
					onClick={resumeSession}
					tooltip='Resume Session'
				>
					<PlayIcon className='text-white' />
				</Button>
			)}
			<Button
				bg='bg-transparent hover:bg-gray-900'
				className='flex h-8 w-8 items-center justify-center'
				padding='p-0'
				tooltip='Stop Session'
			>
				<SquareIcon className='text-white' />
			</Button>
			<div>
				<span>{isRunning ? '' : '+ '}</span>
				<span>{isRunning ? padZeroes(hours) : padZeroes(swHours)}</span>
				<span>
					{isRunning ? padZeroes(minutes) : padZeroes(swMinutes)}
				</span>
				<span>
					{isRunning ? padZeroes(seconds) : padZeroes(swSeconds)}
				</span>
			</div>
		</div>
	)
}
