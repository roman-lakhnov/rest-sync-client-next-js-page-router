// utils/getUxpHeaders.js
// Імпортуємо функцію генерації унікального ідентифікатора з бібліотеки uuid
import { v4 as uuidv4 } from 'uuid'

// Функція для отримання заголовків запиту
export const getUxpHeaders = () => {
	const uxpHeaders = {
		'Purpose-Id': `${process.env.PURPOSE_ID}`,
		'Uxp-Client': `${process.env.INSTANCE_NAME}/${process.env.CLIENT_MEMBER_CLASS}/${process.env.CLIENT_MEMBER_CODE}/${process.env.CLIENT_SUBSYSTEM}`,
		'Uxp-Service': `${process.env.INSTANCE_NAME}/${process.env.SERVICE_MEMBER_CLASS}/${process.env.SERVICE_MEMBER_CODE}/${process.env.SERVICE_SUBSYSTEM}/${process.env.SERVICE_CODE}/${process.env.SERVICE_VERSION}`
	}
	return uxpHeaders
}
