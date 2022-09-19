import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {SessionProvider} from "next-auth/react"
import Head from "next/head"
import {useState} from "react"

import type {DehydratedState} from "@tanstack/react-query"
import type {Session} from "next-auth"
import type {AppProps} from "next/app"
import type {ReactElement} from "react"

import {trpc} from "~/trpc"

export type Props = {
	session?: Session | null
	dehydratedState?: DehydratedState
}

const App = ({
	Component,
	pageProps: {session, dehydratedState, ...pageProps},
}: AppProps<Props>): ReactElement | null => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.svg" />
				<link rel="alternate icon" href="/favicon.png" />
				<link rel="mask-icon" href="/favicon.svg" color="#46a758" />
				<meta name="theme-color" content="#46a758" />
			</Head>
			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={dehydratedState}>
						<Component {...pageProps} />
						<ReactQueryDevtools initialIsOpen={false} />
					</Hydrate>
				</QueryClientProvider>
			</SessionProvider>
		</>
	)
}

export default trpc.withTRPC(App)
