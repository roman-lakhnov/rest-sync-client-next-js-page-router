/** @type {import('next').NextConfig} */
// next.config.mjs
// console.log(process.env)
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
    SERVICE_URL:process.env.SERVICE_URL,
		HEADERS: process.env.HEADERS
		// Other server-side variables
	}
}

export default nextConfig
