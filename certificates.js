// Імпортуємо необхідні модулі
const fs = require('fs') // Для роботи з файловою системою
const path = require('path') // Для роботи з шляхами файлів
const selfsigned = require('selfsigned') // Для генерації самопідписаних сертифікатів

// Визначаємо шлях до папки з сертифікатами
const certsDir = path.resolve(__dirname, 'certs')
// Визначаємо шлях до файлів ключа та сертифіката
const keyPath = path.join(certsDir, 'key.pem')
const certPath = path.join(certsDir, 'cert.pem')

// Створюємо папку для сертифікатів, якщо вона не існує
if (!fs.existsSync(certsDir)) {
	fs.mkdirSync(certsDir)
}

// Генеруємо сертифікати, якщо вони не існують
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
	const attrs = [{ name: 'commonName', value: 'localhost' }]
	const pems = selfsigned.generate(attrs, { days: 365 })

	// Зберігаємо ключ і сертифікат у файли
	fs.writeFileSync(keyPath, pems.private)
	fs.writeFileSync(certPath, pems.cert)

	console.log('Сертифікати згенеровані і збережені в директорію cert.')
} else {
	console.log('Сертифікати вже існують.')
}
