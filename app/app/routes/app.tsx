import { Outlet } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'

export let loader: LoaderFunction = async ({ request }) => {
	return json({})
}

export default function App() {
	return (
		<main className='flex h-full w-full flex-col items-center justify-start'>
			<Outlet />
		</main>
	)
}
