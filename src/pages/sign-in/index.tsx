import {signIn} from "next-auth/react"

import type {NextPage} from "next"

import {getBaseUrl} from "~/utils/getBaseUrl"

const SignIn: NextPage = () => {
	return (
		<div>
			<button type="button" onClick={() => void signIn(`google`, {callbackUrl: `${getBaseUrl(true)}/dashboard/`})}>
				Sign in
			</button>
		</div>
	)
}

export default SignIn
