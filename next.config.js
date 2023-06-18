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
	trailingSlash: true,
}

module.exports = nextConfig
