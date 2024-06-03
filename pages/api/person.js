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
				response = await fetch(serviceUrl, {
					method: 'POST',
					headers: {
						...getHeaders(), // Виклик функції для отримання заголовків
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body) // Встановлення тіла запиту
				})
				data = await response.json() // Отримання даних з відповіді
				if (response.ok) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json({ error: 'Error adding person', details: data }) // Відправлення відповіді про помилку додавання особи
				}
				break

			case 'GET':
				console.log(`Query params: ${JSON.stringify(query)}`) // Логування параметрів запиту для методу GET
				response = await fetch(
					`${serviceUrl}?${new URLSearchParams(query).toString()}`, // Формування URL запиту з параметрами
					{
						method: 'GET',
						headers: {
							...getHeaders() // Виклик функції для отримання заголовків
						}
					}
				)
				data = await response.json() // Отримання даних з відповіді
				if (response.ok) {
					const totalCount = response.headers.get('X-Total-Count') // Отримання заголовка з загальною кількістю записів
					res.setHeader('X-Total-Count', totalCount || '0') // Встановлення заголовка з загальною кількістю записів
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json({ error: 'Error fetching data', details: data }) // Відправлення відповіді про помилку отримання даних
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
