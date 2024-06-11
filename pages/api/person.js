import axios from '@/axiosInstance'
import { getHeaders } from '@/utils/getHeaders' // Імпорт функції для отримання заголовків

// Експорт асинхронної функції-обработчика запиту
export default async function handler(req, res) {
	const { method, body, query } = req // Деструктуризація властивостей об'єкта запиту
	const serviceUrl = `${process.env.SERVICE_URL}/person` // Формування URL сервісу
	try {
		console.log(`Received ${method} request to ${serviceUrl}`) // Логування отриманого методу та URL запиту
		console.log(
			`${body ? `Request body: ${JSON.stringify(body)}. ` : 'No req body. '} ${
				Object.keys(query).length > 0
					? `Request query: ${JSON.stringify(query)}. `
					: 'No req query. '
			}`
		)
		const config = {
			url: serviceUrl,
			method: method,
			headers: {
				...getHeaders(),
				'Content-Type': 'application/json'
			},
			data: body,
			params: query
		}

		switch (method) {
			case 'POST':
				config.method = 'post'
				break
			case 'GET':
				config.method = 'get'
				config.params = query
				delete config.data
				break
			case 'PUT':
				config.method = 'put'
				break
			case 'DELETE':
				config.method = 'delete'
				config.params = query
				delete config.data
				break
			default:
				return res.status(405).json('Method Not Allowed') // Відправлення відповіді про неприпустимий метод
		}
		let response = await axios.request(config)
		console.log(
			`Response status: ${response.status}. Response data: ${response.data}`
		)
		res.status(response.status).json(response.data)
	} catch (error) {
		console.log(
			`Next.js API Internal Server Error: ${JSON.stringify(error.message)}`
		) // Логування внутрішньої помилки сервера
		res.status(500).send('Внутрішня помилка Next.js API') // Відправлення відповіді про внутрішню помилку сервера
	}
}
