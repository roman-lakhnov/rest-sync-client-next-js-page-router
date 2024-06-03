/** @type {import('next').NextConfig} */
// next.config.mjs

// Оголошення об'єкту конфігурації Next.js
const nextConfig = {
	// Увімкнення строгого режиму React
	reactStrictMode: true,
	// Змінні середовища для доступу у додатку
	env: {
		API_URL: process.env.API_URL,
		SERVICE_URL: process.env.SERVICE_URL,
		HEADERS: process.env.HEADERS,
		IF_CLIENT_GENERATES_TRANSACTION_ID: process.env.IF_CLIENT_GENERATES_TRANSACTION_ID
		// Інші змінні для використання на сервері
	}
}
// Виведення змінних середовища у консоль, якщо режим не є продакшеном
if (process.env.NODE_ENV !== 'production') {
	console.log('Loaded environment variables:', {
		API_URL: process.env.API_URL,
		SERVICE_URL: process.env.SERVICE_URL,
		HEADERS: process.env.HEADERS
	})
}
// Експортування об'єкту конфігурації Next.js
export default nextConfig
