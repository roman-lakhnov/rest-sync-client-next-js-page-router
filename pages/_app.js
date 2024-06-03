// pages/_app.js
// Імпортуємо стилі Bootstrap та глобальні стилі нашого додатку.
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

// Основний компонент додатку, який обгортає всі інші компоненти Next.js.
const MyApp = ({ Component, pageProps }) => {
	// Об'єкт, що містить пусті дані для форми.
	const blankFormData = {
		name: '',
		surname: '',
		patronym: '',
		dateOfBirth: '',
		gender: '',
		unzr: '',
		rnokpp: '',
		passportNumber: ''
	}
	// Об'єкт, що містить назви полів форми для відображення.
	const formFieldsNames = {
		name: "Ім'я",
		surname: 'Прізвище',
		patronym: 'По батькові',
		dateOfBirth: 'Дата народження',
		gender: 'Стать',
		unzr: 'УНЗР',
		rnokpp: 'РНОКПП',
		passportNumber: 'Номер паспорту'
	}
	// Передаємо пусті дані форми та назви полів як пропси до компонента.
	return (
		<Component
			{...pageProps}
			blankFormData={blankFormData}
			formFieldsNames={formFieldsNames}
		/>
	)
}
// Експортуємо основний компонент додатку.
export default MyApp
