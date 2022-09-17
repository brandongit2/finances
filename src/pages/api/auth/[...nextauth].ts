import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import type {NextAuthOptions} from "next-auth"

import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "~/utils/env"

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: `/sign-in/`,
	},
}

export default NextAuth(authOptions)
