import {createProxySSGHelpers} from "@trpc/react/ssg"
import {useForm} from "react-hook-form"
import superjson from "superjson"

import type {User} from "@prisma/client"
import type {DehydratedState} from "@tanstack/react-query"
import type {GetStaticProps} from "next"
import type {SubmitHandler} from "react-hook-form"

import {appRouter} from "~/server/routers"
import {trpc} from "~/trpc"

const Index = () => {
	const utils = trpc.useContext()
	const {register, handleSubmit, reset: resetFormValues} = useForm<User>()
	const {data} = trpc.user.getAll.useQuery()

	const addUser = trpc.user.create.useMutation({
		onSuccess: async () => {
			resetFormValues()
			await utils.user.getAll.invalidate()
		},
	})

	const onAddUser: SubmitHandler<User> = async (data) => {
		addUser.mutate(data)
	}

	return (
		<div>
			<h1>Hello world!</h1>

			<form onSubmit={handleSubmit(onAddUser)}>
				<label>
					Name:{` `}
					<input type="text" {...register(`name`)} />
				</label>
				<label>
					Email:{` `}
					<input type="email" {...register(`email`)} />
				</label>
				<button type="submit">Add user</button>
			</form>

			<p>Users:</p>
			<ul>
				{data?.users.map((user) => (
					<li key={user.id}>
						{user.name}, {user.email}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Index

export const getStaticProps: GetStaticProps<{trpcState: DehydratedState}> = async () => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: {},
		transformer: superjson,
	})

	await ssg.user.getAll.prefetch()

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
	}
}
