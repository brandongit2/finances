import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {useState} from "react"

import type {DehydratedState} from "@tanstack/react-query"
import type {AppProps} from "next/app"
import type {ReactElement} from "react"

import {trpc} from "~/trpc"

const App = ({Component, pageProps}: AppProps<{dehydratedState: DehydratedState}>): ReactElement | null => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	)
}

export default trpc.withTRPC(App)
