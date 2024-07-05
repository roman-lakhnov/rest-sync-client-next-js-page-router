// Імпортуємо функцію генерації унікального ідентифікатора з бібліотеки uuid
import { v4 as uuidv4 } from 'uuid'

// Функція для отримання параметрів запиту
export const getUxpParams = () => {
	const queryId = uuidv4()
	const userId = uuidv4()
	const uxpParams = { queryId: queryId, userId: userId }
	return uxpParams
}
