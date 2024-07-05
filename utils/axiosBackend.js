import axios from 'axios' // Імпорт бібліотеки axios для виконання запитів
import https from 'https' // Імпорт модулю https для налаштування HTTPS
import fs from 'fs' // Імпорт модулю fs для роботи з файловою системою

let axiosInstance

if (process.env.PROTOCOL === 'https') {
	// Шлях до вашого сертифікату та ключа
	const certPath = './certs/cert.pem' // Шлях до сертифікату
	const keyPath = './certs/key.pem' // Шлях до ключа

	// Зчитування сертифікату та ключа з файлів
	const cert = fs.readFileSync(certPath) // Зчитування сертифікату
	const key = fs.readFileSync(keyPath) // Зчитування ключа

	// Створення екземпляру Axios з передачею сертифіката та ключа
	axiosInstance = axios.create({
		httpsAgent: new https.Agent({
			cert: cert, // Передача сертифікату
			key: key, // Передача ключа
			rejectUnauthorized: false // Вимкнення перевірки сертифіката (можна видалити, якщо потрібно)
		}),
		baseURL: `${process.env.PROTOCOL}://${process.env.SECURITY_SERVER_IP}`,
		validateStatus: function (status) {
			return status < 501
		}
	})
} else {
	// Створення екземпляру Axios без використання сертифікатів
	axiosInstance = axios.create({
		baseURL: `${process.env.PROTOCOL}://${process.env.SECURITY_SERVER_IP}`,
		validateStatus: function (status) {
			return status < 501
		}
	})
}

export default axiosInstance // Експорт створеного екземпляру Axios
