import * as React from 'react'
import { ReactNode } from 'react'
export const Button = ({ children }: { children: ReactNode | string }) => {
	return (
		<button className='flex px-8 py-4 bg-red-900 text-white rounded-lg'>
			{children}
		</button>
	)
}
