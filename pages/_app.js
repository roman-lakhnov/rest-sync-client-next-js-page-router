// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
	const blankFormData = {
		name: '',
		surname: '',
		patronym: '',
		dateofbirth: '',
		sex: '',
		unzr: '',
		rnokpp: '',
		passportNumber: ''
	}

	const formFieldsNames = {
		name: "Ім'я",
		surname: 'Прізвище',
		patronym: 'По батькові',
		dateofbirth: 'Дата народження',
		sex: 'Стать',
		unzr: 'УНЗР',
		rnokpp: 'РНОКПП',
		passportNumber: 'Номер паспорту'
	}
	return (
		<Component
			{...pageProps}
			blankFormData={blankFormData}
			formFieldsNames={formFieldsNames}
		/>
	)
}

export default MyApp
