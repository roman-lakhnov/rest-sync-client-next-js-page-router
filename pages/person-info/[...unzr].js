// pages/person/[...id].js

// Імпортуємо необхідні бібліотеки та компоненти
import FormComponent from '@/components/FormComponent'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

// Сторінка профіль особи
const PersonInfo = ({ blankFormData, formFieldsNames }) => {
	const router = useRouter()
	const { unzr } = router.query
	const [loading, setLoading] = useState(true)
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
	// Ефект, який викликається при зміні параметра "unzr"
	useEffect(() => {
		fetchPersonInfo() // Виклик функції отримання інформації про особу
	}, [unzr])
	// Функція для отримання інформації про особу
	const fetchPersonInfo = async () => {
		console.log(unzr)
		if (unzr) {
			try {
				const response = await fetch(
					`${process.env.API_URL}/person/unzr/${unzr}`,
					{
						method: 'GET',
						headers: {}
					}
				)
				if (response.ok) {
					const data = await response.json()
					setFormData(data) // Оновлення даних форми
				} else {
					console.error('Failed to fetch person information')
				}
			} catch (error) {
				console.error('Error:', error)
			} finally {
				setLoading(false) // Встановлення стану завантаження в "false"
			}
		}
	}
	// Функція для зміни стану заблокованості полів форми
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
			const response = await fetch(
				`${process.env.API_URL}/person/unzr/${unzr}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}
			)

			if (response.ok) {
				alert('Зміни збережено. Профіль особи оновлено.')
				setIsFieldsDisabled(!isFieldsDisabled) // Зміна стану блокування полів форми
			} else {
				console.error('Failed to update person:', response.statusText)
			}
		} catch (error) {
			console.error('Error updating person:', error)
		}
	}
	// Функція для обробки видалення запису про особу
	const handleDelete = async () => {
		try {
			const response = await fetch(
				`${process.env.API_URL}/person/unzr/${unzr}`,
				{
					method: 'DELETE',
					headers: {}
				}
			)

			if (response.ok) {
				alert('Запис було видалено. Профіль особи відсутній.')
				setFormData({ ...blankFormData }) // Оновлення даних форми
				router.push(`/find-person`) // Перенаправлення на сторінку пошуку осіб
			} else {
				console.error('Failed to delete person:', response.statusText)
			}
		} catch (error) {
			console.error('Error deleting person:', error)
		}
	}

	if (loading) {
		return <div>Завантаження...</div> // Відображення тексту "Завантаження..." поки триває завантаження
	}

	return (
		<div>
			{/* Компонент навігаційного бару */}
			<NavBar />
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

export default PersonInfo
