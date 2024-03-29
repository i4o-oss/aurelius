import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getMdxHeadingsForV2Routes, Layout } from '@i4o/rescribe'

export async function loader({ request }: LoaderArgs) {
	const headings = await getMdxHeadingsForV2Routes(request)
	return json({ headings })
}

export default function Docs() {
	const data = useLoaderData()

	return (
		<Layout data={data}>
			<Outlet />
		</Layout>
	)
}
