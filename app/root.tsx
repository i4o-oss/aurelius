import { ReactNode, Suspense } from 'react'

import { LinksFunction, LoaderFunction } from '@remix-run/node'
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteError,
	useRouteLoaderData,
} from '@remix-run/react'

import { EvoluProvider, useQuery } from '@evolu/react'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import LoadingScreen from '~/components/common/loading-screen'
import { Button } from '~/components/ui/button'
import { Toaster } from '~/components/ui/toaster'
import { TooltipProvider } from '~/components/ui/tooltip'
import stylesheet from '~/globals.css?url'
import AureliusProvider from '~/lib/providers/aurelius'
import { evolu, settingsQuery } from '~/services/evolu/client'
import { themeSessionResolver } from '~/services/theme.server'

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.bunny.net' },
	{
		rel: 'stylesheet',
		href: 'https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800,900|lato:400,700|libre-baskerville:400,700|merriweather:400,700|noto-serif:400,700|open-sans:400,700|pt-serif:400,700|roboto:400,700',
		crossOrigin: 'anonymous',
	},
	{ rel: 'stylesheet', href: stylesheet },
]

export const loader: LoaderFunction = async ({ request }) => {
	const { getTheme } = await themeSessionResolver(request)
	return {
		theme: getTheme(),
	}
}

const App = ({ children, title }: { children: ReactNode; title?: string }) => {
	const data = useRouteLoaderData<typeof loader>('root')
	const [theme] = useTheme()
	const { rows: settings } = useQuery(settingsQuery)

	return (
		<html className={theme ?? 'dark'} lang='en'>
			<head>
				{title ? <title>{title}</title> : <title>Aurelius</title>}
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
				<Links />
			</head>
			<body className='w-screen h-screen !p-0'>
				<Suspense fallback={<LoadingScreen />}>
					<AureliusProvider data={{ settings: settings[0] }}>
						{children}
					</AureliusProvider>
				</Suspense>
				<Toaster />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

const Error = () => {
	const error = useRouteError()
	const [theme] = useTheme()

	return (
		<div className='flex w-full h-full items-center justify-center'>
			<div className='flex flex-col items-center gap-4'>
				<img
					className={`w-64 h-64 ${theme === 'dark' ? 'invert' : ''}`}
					src='/images/crashed-error.svg'
				/>
				<h1 className='text-4xl font-bold'>Oh no!</h1>
				{
					// @ts-expect-error: it's fine
					error?.message ? (
						<p className='text-lg text-gray-500'>
							{
								// @ts-expect-error: it's fine
								error?.message
							}
						</p>
					) : (
						<p className='text-lg text-gray-500'>
							Something unexpected happened! Please try again
							later.
						</p>
					)
				}
				<Link to='/'>
					<Button>Back to Home</Button>
				</Link>
			</div>
		</div>
	)
}

export const ErrorBoundary = () => {
	const data = useRouteLoaderData<typeof loader>('root')

	return (
		<ThemeProvider specifiedTheme={data?.theme} themeAction='/action/theme'>
			<EvoluProvider value={evolu}>
				<App title='Oh no!'>
					<Error />
				</App>
			</EvoluProvider>
		</ThemeProvider>
	)
}

const AppWithProviders = () => {
	const data = useLoaderData<typeof loader>()

	return (
		<ThemeProvider specifiedTheme={data?.theme} themeAction='/action/theme'>
			<EvoluProvider value={evolu}>
				<TooltipProvider>
					<App>
						<Outlet />
					</App>
				</TooltipProvider>
			</EvoluProvider>
		</ThemeProvider>
	)
}

export default AppWithProviders
