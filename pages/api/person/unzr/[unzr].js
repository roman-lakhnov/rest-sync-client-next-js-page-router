// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHeaders } from '@/utils/getHeaders'

export default async function handler(req, res) {
	const { method, query, body } = req
	const { unzr } = query
	const serviceUrl = `${process.env.SERVICE_URL}/person/unzr/${unzr}`

	try {
		let response
		let data

		switch (method) {
			case 'GET':
				response = await fetch(serviceUrl, {
					method: 'GET',
					headers: {
						...getHeaders()
					}
				})
				data = await response.json()
				if (response.ok) {
					res.status(200).json(data)
				} else {
					res.status(400).json({
						error: 'Failed to fetch person information',
						details: data
					})
				}
				break

			case 'PUT':
				response = await fetch(serviceUrl, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						...getHeaders()
					},
					body: JSON.stringify(body)
				})
				data = await response.json()
				if (response.ok) {
					res.status(200).json(data)
				} else {
					res
						.status(400)
						.json({ error: 'Failed to update person', details: data })
				}
				break

			case 'DELETE':
				response = await fetch(serviceUrl, {
					method: 'DELETE',
					headers: {
						...getHeaders()
					}
				})
				if (response.ok) {
					res.status(200).json({ message: 'Person deleted successfully' })
				} else {
					res.status(400).json({ error: 'Failed to delete person' })
				}
				break

			default:
				res.status(405).json({ message: 'Method Not Allowed' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error', details: error })
	}
}
