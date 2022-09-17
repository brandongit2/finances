import {t} from "~/server/trpc"

export const appRouter = t.router({})

export type AppRouter = typeof appRouter
