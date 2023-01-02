import { Link } from '@remix-run/react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

export default function Index() {
	return (
		<main className='flex flex-col items-center justify-center space-y-4 p-24 min-h-screen bg-[url("/images/bg.png")] bg-no-repeat bg-cover bg-center bg-opacity-50'>
			<div className='flex w-full flex-col items-center justify-center space-y-2'>
				<p className='text-center text-lg leading-8 text-white md:w-1/2'>
					Beautiful, minimal writing app that helps you build a
					writing habit.
				</p>
				<p className='text-center text-lg leading-8 text-gray-400 md:w-1/2'>
					Eliminate distractions when writing, track your daily
					writing goal, and more.
				</p>
			</div>
			<div className='flex items-center justify-center space-x-4'>
				<Link to='/app'>
					<button className='text-md inline-flex justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 font-semibold text-brand-800 transition-all duration-200 hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'>
						Start Writing
					</button>
				</Link>
				<a
					target='_blank'
					href='https://twitter.com/aureliusdotink'
					rel='noreferrer'
				>
					<button className='flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium leading-8 text-brand-500'>
						<span>Twitter</span>
						<ArrowTopRightIcon className='ml-1 mt-1 h-[18px] w-[18px]' />
					</button>
				</a>
			</div>
		</main>
	)
}
