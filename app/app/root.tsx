import type { ReactNode } from 'react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
// @ts-ignore
import styles from '~/styles/app.css'
// @ts-ignore
import uiStyles from '@aurelius/ui/main.css'

interface DocumentProps {
	children: ReactNode
}

export const links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Orbitron:wght@700&display=swap',
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'stylesheet', href: uiStyles },
	]
}

export const meta: MetaFunction = () => ({
	// TODO: Fill out the empty strings as required
	charset: 'utf-8',
	'msapplication-TileColor': '#2b5797',
	'og:site': '',
	'og:url': 'https://aurelius.ink',
	'og:title': 'Aurelius: Writing app for the modern writer',
	'og:description':
		'Beautifully minimal. No distractions. Just write. Available on Linux, Windows, and macOS.',
	'og:image': '',
	'theme-color': '',
	title: 'Aurelius: Writing app for the modern writer',
	'twitter:card': 'summary_large_image',
	'twitter:site': '',
	'twitter:url': 'https://aurelius.ink',
	'twitter:creator': 'Ilango Rajagopal',
	'twitter:title': 'Aurelius: Writing app for the modern writer',
	'twitter:description':
		'Beautifully minimal. No distractions. Just write. Available on Linux, Windows, and macOS.',
	'twitter:image': '',
	viewport: 'width=device-width,initial-scale=1',
})

const Document = (props: DocumentProps) => {
	return (
		<html lang='en' className='h-full'>
			<head>
				<Meta />
				<Links />
				<title>Synthwave Stack</title>
			</head>
			<body className='h-full w-full bg-brand-900 font-sans'>
				{process.env.NODE_ENV === 'production' ? (
					<>
						{/*
							TODO: fill data-code
							// get data-code by visiting dashboard.pirsch.io and clicking on the website you want to track
						*/}
						<script
							defer
							type='text/javascript'
							src='https://api.pirsch.io/pirsch.js'
							id='pirschjs'
							data-code=''
						></script>
					</>
				) : null}
				{props.children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}
