module.exports = {
	trailingSlash: true,
	webpack: (config) => {
		config.experiments = {
			topLevelAwait: true,
			layers: true,
		}
		return config
	},
}
