// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHeaders } from '@/utils/getHeaders'

export default async function handler(req, res) {
	const { method, body, query } = req
	const serviceUrl = `${process.env.SERVICE_URL}/person`

	try {
		console.log(`Received ${method} request to ${serviceUrl}`); // Log the incoming request
		let response
		let data
		switch (method) {
			case 'POST':
			console.log(`Request body: ${JSON.stringify(body)}`); // Log request body for POST requests
				response = await fetch(serviceUrl, {
					method: 'POST',
					headers: {
						...getHeaders(),
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				})
				data = await response.json()
				if (response.ok) {
					res.status(200).json(data)
				} else {
					res.status(400).json({ error: 'Error adding person', details: data })
				}
				break

			case 'GET':
				console.log(`Query params: ${JSON.stringify(query)}`); // Log query parameters for GET requests
				response = await fetch(
					`${serviceUrl}?${new URLSearchParams(query).toString()}`,
					{
						method: 'GET',
						headers: {
							...getHeaders()
						}
					}
				)
				data = await response.json()
				if (response.ok) {
					const totalCount = response.headers.get('X-Total-Count')
					res.setHeader('X-Total-Count', totalCount || '0')
					res.status(200).json(data)
				} else {
					res.status(400).json({ error: 'Error fetching data', details: data })
				}
				break
			default:
				res.status(405).json({ message: 'Method Not Allowed' })
		}
	} catch (error) {
		console.log(`Internal Server Error: ${error.message}`); // Log internal server errors
		res.status(500).json({ error: 'Internal Server Error', details: error })
	}
}
