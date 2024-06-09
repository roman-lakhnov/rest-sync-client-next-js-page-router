import axios from 'axios'; // Імпорт бібліотеки axios для виконання запитів
import https from 'https'; // Імпорт модулю https для налаштування HTTPS
import fs from 'fs'; // Імпорт модулю fs для роботи з файловою системою

// Шлях до вашого сертифікату та ключа
const certPath = './cert/cert.pem'; // Шлях до сертифікату
const keyPath = './cert/key.pem'; // Шлях до ключа

// Зчитування сертифікату та ключа з файлів
const cert = fs.readFileSync(certPath); // Зчитування сертифікату
const key = fs.readFileSync(keyPath); // Зчитування ключа

// Створення екземпляру Axios з передачею сертифіката та ключа
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    cert: cert, // Передача сертифікату
    key: key, // Передача ключа
    rejectUnauthorized: false // Вимкнення перевірки сертифіката (можна видалити, якщо потрібно)
  })
});

export default axiosInstance; // Експорт створеного екземпляру Axios
