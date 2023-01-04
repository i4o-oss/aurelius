import { useState } from 'react'
import { PrimaryButton, Popover, RadioGroup, Switch } from '@aurelius/ui'
import { useFetcher, useTransition } from '@remix-run/react'

const sessionGoalOptions = [
	{
		id: 'duration',
		label: 'Duration',
		value: 'duration',
	},
	{
		id: 'wordCount',
		label: 'Word Count',
		value: 'wordCount',
	},
]

export default function NewSession() {
	const sessionFetcher = useFetcher()
	const transition = useTransition()
	const [sessionGoal, setSessionGoal] = useState('duration')

	if (transition.submission) {
		console.log(transition.submission)
	}

	const onRadioValueChange = (value: string) => {
		setSessionGoal(value)
	}

	return (
		<Popover
			title='New Session'
			trigger={
				<button className='inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-1 text-sm font-semibold text-gray-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2'>
					New Session
				</button>
			}
		>
			<div className='mt-4 w-96'>
				<sessionFetcher.Form
					className='grid w-full grid-cols-5 gap-4'
					action='/sessions'
					method='post'
				>
					<label
						htmlFor='session_goal'
						className='col-span-3 text-sm'
					>
						Session Type
					</label>
					<RadioGroup
						className='col-span-2 space-y-2'
						defaultValue='duration'
						name='session_goal'
						options={sessionGoalOptions}
						onChange={onRadioValueChange}
					/>
					<label
						htmlFor='session_target'
						className='col-span-3 text-sm'
					>
						Target
					</label>
					<div className='col-span-2 flex items-center justify-start space-x-2'>
						<input
							className='h-8 w-16 rounded-md border border-white bg-transparent px-2 py-1 text-sm'
							defaultValue={sessionGoal === 'duration' ? 30 : 500}
							name='session_target'
							type='number'
						/>
						<span className='text-sm'>
							{sessionGoal === 'duration' ? 'minutes' : 'words'}
						</span>
					</div>
					<label
						htmlFor='session_end_notification'
						className='col-span-3 text-sm'
					>
						Notify when session ends
					</label>
					<div className='col-span-2'>
						<Switch name='session_end_notification' />
					</div>
					<label
						htmlFor='session_music'
						className='col-span-3 text-sm'
					>
						Music
					</label>
					<div className='col-span-2'>
						<Switch name='session_music' />
					</div>
					<div className='col-span-5 flex justify-end'>
						<PrimaryButton type='submit'>
							<span className='text-sm'>Start</span>
						</PrimaryButton>
					</div>
				</sessionFetcher.Form>
			</div>
		</Popover>
	)
}
