import axios from '@/axiosInstance'
import { getHeaders } from '@/utils/getHeaders' // Імпорт функції для отримання заголовків

// Експорт асинхронної функції-обработчика запиту
export default async function handler(req, res) {
	const { method, body, query } = req // Деструктуризація властивостей об'єкта запиту
	const serviceUrl = `${process.env.SERVICE_URL}/person` // Формування URL сервісу

	try {
		console.log(`Received ${method} request to ${serviceUrl}`) // Логування отриманого методу та URL запиту
		let response
		let data
		switch (method) {
			case 'POST':
				console.log(`Request body: ${JSON.stringify(body)}`) // Логування тіла запиту для методу POST
				response = await axios.post(serviceUrl, body, {
					headers: {
							...getHeaders(), // Виклик функції для отримання заголовків
							'Content-Type': 'application/json'
					}
			});
			data = response.data; //  Отримання даних з відповіді
			if (response.status === 200) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json(data) // Відправлення відповіді про помилку додавання особи
				}
				break

			case 'GET':
				console.log(`Query params: ${JSON.stringify(query)}`) // Логування параметрів запиту для методу GET
				response = await axios.get(`${serviceUrl}?${new URLSearchParams(query).toString()}`, {
					headers: {
							...getHeaders()  // Виклик функції для отримання заголовків
					}
			});
			data = response.data;  // Отримання даних з відповіді
				if (response.status === 200) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json(data) // Відправлення відповіді про помилку отримання даних
				}
				break

			case 'PUT':
				console.log(`Request body for PUT: ${JSON.stringify(body)}`) // Логування тіла запиту для методу PUT
				response = await axios.put(serviceUrl, body, {
					headers: {
							'Content-Type': 'application/json',
							...getHeaders() // Виклик функції для отримання заголовків
					}
			});
			data = response.data; //  Отримання даних з відповіді
			if (response.status === 200) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json(data) // Відправлення відповіді про помилку оновлення особи
				}
				break

			case 'DELETE':
				console.log(`Request body for DELETE: ${JSON.stringify(body)}`) // Логування спроби видалення особи
			  response = await axios.delete(`${serviceUrl}?${new URLSearchParams(query).toString()}`, {
					headers: {
							...getHeaders() // Виклик функції для отримання заголовків
					}
			});
			data = response.data; //  Отримання даних з відповіді
			if (response.status === 200) {
					res.status(200).json(data) // Відправлення успішної відповіді про видалення особи
				} else {
					res.status(400).json(data) // Відправлення відповіді про помилку видалення особи
				}
				break

			default:
				res.status(405).json({ message: 'Method Not Allowed' }) // Відправлення відповіді про неприпустимий метод
		}
	} catch (error) {
		console.log(`Internal Server Error: ${error.message}`) // Логування внутрішньої помилки сервера
		res.status(500).json({ error: 'Internal Server Error', details: error }) // Відправлення відповіді про внутрішню помилку сервера
	}
}
