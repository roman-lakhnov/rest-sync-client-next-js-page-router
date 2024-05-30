// utils/getHeaders.js
import { v4 as uuidv4 } from 'uuid'

export const getHeaders = () => {
  const uuid = uuidv4()
  console.log(uuid) // Output: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
	try {
		const headers = JSON.parse(process.env.HEADERS || '{}')
    headers["Uxp-transaction-id"] = uuid;

		// Optional: Validate required headers
		const requiredHeaders = ['Uxp-Client', 'Uxp-Service']
		requiredHeaders.forEach(header => {
			if (!headers[header]) {
				console.warn(`Missing required header: ${header}`)
			}
		})

		return headers
	} catch (error) {
		console.error('Failed to parse headers from .env file', error)
		return {}
	}
}
