import { getHeaders } from '@/utils/getHeaders' // Імпорт функції для отримання заголовків
// Експорт асинхронної функції-обработчика запиту
export default async function handler(req, res) {
	const { method, query, body } = req // Деструктуризація властивостей об'єкта запиту
	const { unzr } = query // Деструктуризація параметру запиту
	const serviceUrl = `${process.env.SERVICE_URL}/person/unzr/${unzr}` // Формування URL сервісу

	try {
		console.log(`Received ${method} request to ${serviceUrl}`) // Логування отриманого методу та URL запиту
		let response
		let data

		switch (method) {
			case 'GET':
				response = await fetch(serviceUrl, {
					method: 'GET',
					headers: {
						...getHeaders() // Виклик функції для отримання заголовків
					}
				})
				data = await response.json() // Отримання даних з відповіді
				if (response.ok) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res.status(400).json({
						error: 'Failed to fetch person information', // Відправлення відповіді про помилку отримання інформації про особу
						details: data
					})
				}
				break

			case 'PUT':
				console.log(`Request body for PUT: ${JSON.stringify(body)}`) // Логування тіла запиту для методу PUT
				response = await fetch(serviceUrl, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						...getHeaders() // Виклик функції для отримання заголовків
					},
					body: JSON.stringify(body) // Встановлення тіла запиту
				})
				data = await response.json() // Отримання даних з відповіді
				if (response.ok) {
					res.status(200).json(data) // Відправлення успішної відповіді з даними
				} else {
					res
						.status(400)
						.json({ error: 'Failed to update person', details: data }) // Відправлення відповіді про помилку оновлення особи
				}
				break

			case 'DELETE':
				console.log(`Delete attempt`) // Логування спроби видалення особи
				response = await fetch(serviceUrl, {
					method: 'DELETE',
					headers: {
						...getHeaders() // Виклик функції для отримання заголовків
					}
				})
				if (response.ok) {
					res.status(200).json({ message: 'Person deleted successfully' }) // Відправлення успішної відповіді про видалення особи
				} else {
					res.status(400).json({ error: 'Failed to delete person' }) // Відправлення відповіді про помилку видалення особи
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
