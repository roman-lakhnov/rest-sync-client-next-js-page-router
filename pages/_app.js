// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { blankFormData, formFieldsNames } from './constants' // Import constants

const MyApp = ({ Component, pageProps }) => {
	return (
		<Component
			{...pageProps}
			blankFormData={blankFormData}
			formFieldsNames={formFieldsNames}
		/>
	)
}

export default MyApp
