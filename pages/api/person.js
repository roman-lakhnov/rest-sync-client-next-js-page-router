// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHeaders } from '@/utils/getHeaders'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
	const { method, body, query } = req
	const serviceUrl = `${process.env.SERVICE_URL}/person`

	try {
		let response
		let data

		switch (method) {
			case 'POST':
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
		res.status(500).json({ error: 'Internal Server Error', details: error })
	}
}
