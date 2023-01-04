import type { FC } from 'react'
import { Fragment } from 'react'
// TODO: Replace headlessui menu with catalystui menu
import { Menu, Transition } from '@headlessui/react'
import { PlusIcon } from '@radix-ui/react-icons'

interface EditorFloatingMenuProps {
	editor: any
	fileUploadInputRef: any
}

const EditorFloatingMenu: FC<EditorFloatingMenuProps> = ({
	editor,
	fileUploadInputRef,
}) => {
	function selectImageFile() {
		// @ts-ignore
		fileUploadInputRef?.current?.click()
	}

	return (
		<Menu
			as='div'
			className='absolute relative -left-[4.2rem] inline-block text-left'
		>
			<div>
				<Menu.Button className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-white text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
					<PlusIcon />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items
					className='absolute -top-2 left-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					unmount={false}
				>
					<div className='px-1 py-1 '>
						<Menu.Item>
							<div>
								<button
									className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-white hover:bg-brand-400`}
									onClick={selectImageFile}
								>
									Image
								</button>
							</div>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-white hover:bg-brand-400`}
							>
								Bookmark
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-white hover:bg-brand-400`}
							>
								Youtube
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default EditorFloatingMenu
