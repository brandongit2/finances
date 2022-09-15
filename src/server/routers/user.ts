import {z} from "zod"

import {db} from "~/db"
import {t} from "~/server/trpc"

export const userRouter = t.router({
	getAll: t.procedure.query(async () => {
		return {users: await db.user.findMany()}
	}),
	create: t.procedure
		.input((value: unknown) => {
			const schema = z.object({
				name: z.string(),
				email: z.string().email(),
			})
			return schema.parse(value)
		})
		.mutation(async ({input}) => {
			const user = await db.user.create({
				data: {
					name: input.name,
					email: input.email,
				},
			})
			return user
		}),
})
