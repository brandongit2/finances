import {unstable_getServerSession} from "next-auth"
import {signOut, useSession} from "next-auth/react"

import type {GetServerSideProps, NextPage} from "next"
import type {Props as AppProps} from "~/pages/_app"

import {authOptions} from "~/pages/api/auth/[...nextauth]"
import {getBaseUrl} from "~/utils/getBaseUrl"

const Dashboard: NextPage = () => {
	const {data: session} = useSession()

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Yay! You&apos;re signed in as {session?.user?.name}!</p>
			<ul>
				<li>
					<button type="button" onClick={() => void signOut({callbackUrl: `${getBaseUrl()}/`})}>
						Sign out
					</button>
				</li>
			</ul>
		</div>
	)
}

export default Dashboard

export const getServerSideProps: GetServerSideProps<AppProps> = async (context) => {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)
	if (session === null) throw new Error(`session is null`) // This shouldn't happen because of middleware

	return {
		props: {session},
	}
}
