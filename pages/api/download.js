// pages/api/download.js
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
		const { fileType, fileName } = req.query

		let filePath

		if (fileType === 'asic') {
			filePath = path.join(process.cwd(), 'asic', fileName)
		} else if (fileType === 'cert') {
			filePath = path.join(process.cwd(), 'certs', 'cert.pem')
		} else {
			logger.warn('Invalid file type requested')
			return res.status(400).json({ error: 'Invalid file type' })
		}

		try {
			if (fs.existsSync(filePath)) {
				res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
				res.setHeader('Content-Type', 'application/octet-stream')
				logger.info(`File found: ${filePath}, starting download`)
				fs.createReadStream(filePath).pipe(res)
			} else {
				logger.warn(`File not found: ${filePath}`)
				res.status(404).json({ error: 'File not found' })
			}
		} catch (error) {
			logger.error(`Failed to download file: ${error.message}`)
			res.status(500).json({ error: 'Failed to download file' })
		}
	})
}
