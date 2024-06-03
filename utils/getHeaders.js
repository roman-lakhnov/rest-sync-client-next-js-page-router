// utils/getHeaders.js
// Імпортуємо функцію генерації унікального ідентифікатора з бібліотеки uuid
import { v4 as uuidv4 } from 'uuid'

// Функція для отримання заголовків запиту
export const getHeaders = () => {
	try {
		// Спробуємо розпарсити заголовки з змінної середовища, або встановимо пустий об'єкт
		const headers = JSON.parse(process.env.HEADERS || '{}')
		// Якщо змінна середовища вказує, що клієнт генерує унікальний ідентифікатор, то додаємо його до заголовків
		if (process.env.IF_CLIENT_GENERATES_TRANSACTION_ID === 'true') {
			// Генеруємо унікальний ідентифікатор
			const uuid = uuidv4()
			console.log(uuid) // Виводимо унікальний ідентифікатор у консоль
			headers['Uxp-transaction-id'] = uuid
		}
		// Опційно: Перевіряємо обов'язкові заголовки
		const requiredHeaders = ['Uxp-Client', 'Uxp-Service']
		requiredHeaders.forEach(header => {
			if (!headers[header]) {
				console.warn(`Missing required header: ${header}`)
			}
		})

		return headers
	} catch (error) {
		console.error('Failed to parse headers from .env file', error)
		return {} // Повертаємо пустий об'єкт у разі помилки
	}
}
