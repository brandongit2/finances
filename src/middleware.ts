import {withAuth} from "next-auth/middleware"

import {getBaseUrl} from "~/utils/getBaseUrl"

export default withAuth({
	pages: {
		signIn: `${getBaseUrl()}/sign-in/`,
	},
})

export const config = {
	matcher: [`/dashboard`],
}
