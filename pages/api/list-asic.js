import fs from 'fs'
import path from 'path'
import morganMiddleware from '@/utils/middleware'
import logger from '@/utils/logger'

export default function handler(req, res) {
	// Apply Morgan middleware
	morganMiddleware(req, res, err => {
		if (err) {
			logger.error('Morgan middleware error', err)
			return res.status(500).end('Internal Server Error')
		}

		const asisFolder = path.join(process.cwd(), 'asic')

		try {
			const files = fs.readdirSync(asisFolder).map(fileName => {
				const filePath = path.join(asisFolder, fileName)
				const stats = fs.statSync(filePath)
				return {
					name: fileName,
					createdAt: stats.birthtime
				}
			})
			logger.info('Directory /acis read successfully')
			res.status(200).json({ files })
		} catch (error) {
			logger.error(`Failed to read directory: ${error.message}`)
			res.status(500).json({ error: 'Failed to read /acis directory' })
		}
	})
}
