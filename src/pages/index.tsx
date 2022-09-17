import {signOut, useSession} from "next-auth/react"
import Link from "next/link"

import type {NextPage} from "next"

const Index: NextPage = () => {
	const {data: session} = useSession()

	return (
		<div>
			<h1>Finances Landing Page</h1>
			{session?.user ? (
				<div>
					<p>You&apos;re signed in as {session.user.name}!</p>
					<ul>
						<li>
							<Link href="/dashboard">Go to dashboard</Link>
						</li>
						<li>
							<button type="button" onClick={() => void signOut()}>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			) : (
				<p>
					You&apos;re not signed in. Click <Link href="/sign-in">here</Link> to sign in.
				</p>
			)}
		</div>
	)
}

export default Index
