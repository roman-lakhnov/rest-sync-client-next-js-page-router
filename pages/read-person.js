// Імпортуємо необхідні бібліотеки та компоненти
import FormComponent from '@/components/FormComponent'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

// Сторінка профіль особи
const ReadPerson = ({
	blankFormData,
	formFieldsNames,
	setSelectedPerson,
	selectedPerson
}) => {
	const router = useRouter()
	console.log(selectedPerson)
	const [formData, setFormData] = useState({ ...blankFormData })
	const [isFieldsDisabled, setIsFieldsDisabled] = useState(true)
	const [isDataRequired, setIsDataRequired] = useState({
		name: true,
		surname: true,
		patronym: false,
		dateOfBirth: true,
		rnokpp: true,
		unzr: true,
		passportNumber: true,
		gender: true
	})

	useEffect(() => {
		if (selectedPerson) {
			setFormData(selectedPerson)
		}
	}, [selectedPerson])
	const toggleDisabled = () => {
		setIsFieldsDisabled(!isFieldsDisabled)
	}
	// Функція для обробки зміни значення в полі форми
	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}
	// Функція для обробки відправки форми
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await fetch(`${process.env.API_URL}/person`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					attribute: 'unzr',
					value: selectedPerson.unzr,
					...formData
				})
			})
			const data = await response.json()
			if (response.ok) {
				setSelectedPerson(formData)
				alert(data)
				setIsFieldsDisabled(!isFieldsDisabled) // Зміна стану блокування полів форми
			} else {
				alert(data)
			}
		} catch (error) {
			console.error('Error updating person:', error)
		}
	}
	// Функція для обробки видалення запису про особу
	const handleDelete = async () => {
		const params = new URLSearchParams({
			attribute: 'unzr',
			value: selectedPerson.unzr
		})
		try {
			const response = await fetch(`${process.env.API_URL}/person?${params}`, {
				method: 'DELETE',
				headers: {}
			})
			const data = await response.json()
			if (response.ok) {
				alert(data)
				setSelectedPerson(null)
				router.push(`/find-person`) // Перенаправлення на сторінку пошуку осіб
			} else {
				alert(data)
			}
		} catch (error) {
			console.error('Error deleting person:', error)
		}
	}

	return (
		<div>
			{/* Компонент навігаційного бару */}
			<NavBar selectedPerson={selectedPerson} />
			<Container>
				{/* Заголовок сторінки */}
				<h2 className='mt-5'>Профіль особи</h2>
				{/* Компонент форми */}
				<FormComponent
					formData={formData}
					formFieldsNames={formFieldsNames}
					isDataRequired={isDataRequired}
					isFieldsDisabled={isFieldsDisabled}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
				/>
				{/* Кнопка розблокування/заблокування форми */}
				<Button variant='dark' onClick={toggleDisabled} className='mt-3'>
					{isFieldsDisabled
						? 'Розблокувати запис'
						: 'Заблокувати\u00A0\u00A0\u00A0запис'}
				</Button>
				{/* Кнопка збереження змін форми */}
				<Button
					variant='success'
					type='submit'
					form='personForm'
					className='mt-3 ms-3'
					disabled={isFieldsDisabled}
				>
					Зберегти зміни
				</Button>
				{/* Кнопка видалення запису */}
				<Button
					variant='danger'
					onClick={handleDelete}
					className='mt-3 ms-3'
					disabled={isFieldsDisabled}
				>
					Видалити запис
				</Button>
			</Container>
		</div>
	)
}

export default ReadPerson
