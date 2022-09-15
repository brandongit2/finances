import {userRouter} from "~/server/routers/user"
import {t} from "~/server/trpc"

export const appRouter = t.router({
	user: userRouter,
})

export type AppRouter = typeof appRouter
