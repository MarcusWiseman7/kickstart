export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'kickstart',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	publicRuntimeConfig: {
		campaignFactoryContractAddress: process.env.CAMPAIGN_FACTORY_CONTRACT_ADDRESS,
	},

	privateRuntimeConfig: {
		mnemonicPhrase: process.env.MNEMONIC_PHRASE,
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxt/http', '@nuxtjs/proxy'],

	http: {
		proxy: true,
	},

	proxy: {
		'/api/': {
			target: 'http://localhost:5050',
			pathRewrite: { '^/api/': '' },
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend(config, ctx) {
			config.node = {
				fs: 'empty',
			};
		},
	},
};
