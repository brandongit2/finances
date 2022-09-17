export const getBaseUrl = (alwaysUseAbsoluteUrls = false): string => {
	// If in browser, use relative URLs
	if (typeof window !== `undefined` && !alwaysUseAbsoluteUrls) return ``

	// If on server, use absolute URLs
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

	// If running locally, use localhost
	return `http://localhost:${process.env.PORT ?? 3000}`
}
