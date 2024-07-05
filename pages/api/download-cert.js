// pages/api/download.js
import fs from 'fs' // Імпорт модуля fs для роботи з файлами
import path from 'path' // Імпорт модуля path для роботи з шляхами до файлів

// Функція, яка обробляє запит на завантаження файлу cert.pem
export default function handler(req, res) {
	try {
		const filePath = path.resolve('./certs/cert.pem') // Отримання повного шляху до файлу cert.pem
		const fileContent = fs.readFileSync(filePath) // Читання вмісту файлу cert.pem
		res.setHeader('Content-Type', 'application/octet-stream') // Встановлення заголовку Content-Type
		res.setHeader('Content-Disposition', 'attachment; filename="cert.pem"') // Встановлення заголовку Content-Disposition
		res.status(200).send(fileContent) // Відправлення вмісту файлу як відповідь
	} catch (error) {
		console.error(`Error while reading cert.pem file: ${error.message}`)
		res.status(500).send('Internal Server Error')
	}
}
