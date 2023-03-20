/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.prismic.io'],
		unoptimized : true
	},
	typescript: {
		ignoreBuildErrors: true
	},
}

module.exports = nextConfig
