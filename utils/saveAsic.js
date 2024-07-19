import axios from './axiosBackend'
import fs from 'fs'
import path from 'path'

export default async function saveAsic(uxpParams) {
	try {
		const asicQuery = {
			queryId: uxpParams.queryId,
			xRoadInstance: 'test1',
			memberClass: 'GOV',
			memberCode: '10000003',
			subsystemCode: 'CLIENT'
		}
		const asicUrl = `${process.env.PROTOCOL}://${process.env.SECURITY_SERVER_IP}/signature`
		const asicConfig = {
			url: asicUrl,
			method: 'get',
			params: asicQuery,
			responseType: 'arraybuffer' // Important for binary data
		}
		let asicContainerResponse = await axios.request(asicConfig)

		const filePath = path.join(
			process.cwd(),
			'ASIC',
			`${uxpParams.queryId}.zip`
		)
		fs.writeFileSync(filePath, asicContainerResponse.data)
	} catch (error) {
		throw error
	}
}
