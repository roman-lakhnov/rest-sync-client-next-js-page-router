/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
		SERVICE_URL: process.env.SERVICE_URL,
		HEADERS: process.env.HEADERS
		// Other server-side variables
	}
}
if (process.env.NODE_ENV !== 'production') {
  console.log('Loaded environment variables:', {
    API_URL: process.env.API_URL,
    SERVICE_URL: process.env.SERVICE_URL,
    HEADERS: process.env.HEADERS,
  });
}

export default nextConfig
