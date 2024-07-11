import axios from '@/utils/axiosBackend.js'
import saveAsic from '../../utils/saveAsic.js'
import { getUxpParams } from '@/utils/getUxpParams'
import { getUxpHeaders } from '@/utils/getUxpHeaders' // Імпорт функції для отримання заголовків
import morganMiddleware from '@/utils/middleware'
import logger from '@/utils/logger'

// Експорт асинхронної функції-обработчика запиту
export default async function handler(req, res) {
	// Apply Morgan middleware
	morganMiddleware(req, res, async err => {
		if (err) return res.status(500).end('Internal Server Error')
		const { method, body, query } = req // Деструктуризація властивостей об'єкта запиту
		const uxpParams = getUxpParams()
		const serviceUrl = `/restapi/person` // Формування URL сервісу
		try {
			logger.info(`Received ${method} request to ${serviceUrl}`)
			// Логування отриманого методу та URL запиту
			logger.info(
				`${
					body ? `Request body: ${JSON.stringify(body)}. ` : 'No req body. '
				} ${
					Object.keys(query).length > 0
						? `Request query: ${JSON.stringify(query)}. `
						: 'No req query. '
				}`
			)
			const config = {
				url: serviceUrl,
				method: method,
				headers: {
					...getUxpHeaders()
				},
				data: body,
				params: uxpParams
			}
			logger.info(`Next Api added UxpHeaders ${JSON.stringify(config.headers)}`)
			switch (method) {
				case 'POST':
					config.method = 'post'
					config.headers['Content-Type'] = 'application/json'
					break
				case 'GET':
					config.method = 'get'
					config.params = { ...config.params, ...query }
					delete config.data
					break
				case 'PUT':
					config.method = 'put'
					config.headers['Content-Type'] = 'application/json'
					break
				case 'DELETE':
					config.method = 'delete'
					config.params = { ...config.params, ...query }
					delete config.data
					break
				default:
					return res.status(405).json('Method Not Allowed') // Відправлення відповіді про неприпустимий метод
			}
			let response = await axios.request(config)
			logger.info(
				`Response status: ${response.status}. Response data: ${JSON.stringify(
					response.data
				)}`
			)
			saveAsic(uxpParams)
			res.status(response.status).json(response.data)
		} catch (error) {
			logger.error(`Error: ${JSON.stringify(error)}`)
			res.status(500).send('Внутрішня помилка серверу') // Відправлення відповіді про внутрішню помилку сервера
		}
	})
}
