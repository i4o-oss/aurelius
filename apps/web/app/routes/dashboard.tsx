import { LOCAL_STORAGE_KEYS, SettingsData } from '@aurelius/writer'
import useLocalStorage from '@rehooks/local-storage'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { Footer, Header } from '~/components'
import Settings from '~/components/settings'
import { getSettingsFromUserId } from '~/models/settings.server'
import { getUserProfile } from '~/models/user.server'
import { auth } from '~/services/auth.server'

// TODO: fix these types
interface LoaderData {
    settings?: any
    user?: any
}

export async function loader({ request }: LoaderArgs) {
    let user = await auth.isAuthenticated(request)
    if (user) {
        const profile = await getUserProfile(user?.id)
        const settings = await getSettingsFromUserId(user?.id)
        return json({ settings, user: profile })
    }

    return json({})
}

export default function Dashboard() {
    const { settings: settingsFromDb, user } =
        useLoaderData<SerializeFrom<LoaderData>>()
    const [settings] = useLocalStorage<string>(
        LOCAL_STORAGE_KEYS.GUEST_SETTINGS
    )
    const settingsData =
        user && settingsFromDb
            ? settingsFromDb
            : (JSON.parse(JSON.stringify(settings)) as SettingsData)
    const [showSettingsDialog, setShowSettingsDialog] = useState(false)

    return (
        <div className='flex min-h-screen flex-col'>
            <Header setShowSettingsDialog={setShowSettingsDialog} user={user} />
            <main className='flex min-h-[calc(100vh-20rem)] flex-1 items-start justify-center pb-16'>
                <Outlet />
                <Settings
                    settings={settingsData}
                    showSettingsDialog={showSettingsDialog}
                    setShowSettingsDialog={setShowSettingsDialog}
                    user={user}
                />
            </main>
            <Footer />
        </div>
    )
}
