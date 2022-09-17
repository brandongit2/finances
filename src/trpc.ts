import {httpBatchLink, loggerLink} from "@trpc/client"
import {createTRPCNext} from "@trpc/next"
import superjson from "superjson"

import type {NextPageContext} from "next"
import type {AppRouter} from "~/server/routers"

import {getBaseUrl} from "~/utils/getBaseUrl"

export interface SSRContext extends NextPageContext {
	status?: number
}

export const trpc = createTRPCNext<AppRouter, SSRContext>({
	config: () => {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === `development` || (opts.direction === `down` && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		}
	},
	ssr: true,
	responseMeta: (opts) => {
		const ctx = opts.ctx as SSRContext

		if (ctx.status) {
			return {
				status: ctx.status,
			}
		}

		const error = opts.clientErrors[0]
		if (error) {
			return {
				status: error.data?.httpStatus ?? 500,
			}
		}

		return {}
	},
})
