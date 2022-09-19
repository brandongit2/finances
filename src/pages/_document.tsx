import {Html, Head, Main, NextScript} from "next/document"

import type {ReactElement} from "react"

const Document = (): ReactElement | null => {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
