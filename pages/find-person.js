// pages/find-person.js

// Імпортуємо необхідні бібліотеки та компоненти
import FormComponent from '@/components/FormComponent'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Container, Form, Pagination, Table } from 'react-bootstrap'

// Сторінка для пошуку особи в реєстрі
export default function FindPerson({ blankFormData, formFieldsNames }) {
	// Ініціалізуємо роутер та стани для форми та результатів пошуку
	const router = useRouter()
	const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)
	const [formData, setFormData] = useState({ ...blankFormData })
	const [results, setResults] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [perPage, setPerPage] = useState(50)
	const [totalCount, setTotalCount] = useState()
	const [isDataRequired, setIsDataRequired] = useState({
		name: false,
		surname: false,
		patronym: false,
		dateOfBirth: false,
		rnokpp: false,
		unzr: false,
		passportNumber: false,
		gender: false
	})
	// Функція для виконання запиту на сервер при зміні сторінки або кількості записів на сторінці
	useEffect(() => {
		handleFetch()
	}, [currentPage, perPage])
	// Функція для обробки зміни значення поля форми
	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	// Функція для очищення форми
	const handleClear = () => {
		setFormData({ ...blankFormData })
	}
	// Функція для виконання запиту на сервер
	const handleFetch = async (pageReset = false, e) => {
		if (e) {
			e.preventDefault()
		}
		if (pageReset) {
			setCurrentPage(1)
		}
		const filteredFormData = Object.fromEntries(
			Object.entries(formData).filter(([_, value]) => value)
		)
		const params = new URLSearchParams({
			...filteredFormData,
			_page: currentPage,
			_limit: perPage
		})
		try {
			const response = await fetch(`${process.env.API_URL}/person?${params}`, {
				method: 'GET',
				headers: {}
			})
			if (response.ok) {
				const data = await response.json()
				setResults(data)
				// Встановлюємо загальну кількість сторінок на основі загальної кількості записів
				const totalCount = parseInt(response.headers.get('X-Total-Count'), 10)
				setTotalCount(totalCount)
				const totalPages = Math.ceil(totalCount / perPage)
				setTotalPages(totalPages)
			} else {
				console.error('Error fetching data')
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}
	// Функція для зміни поточної сторінки
	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}
	// Функція для зміни кількості записів на сторінці
	const handlePerPageChange = e => {
		setPerPage(parseInt(e.target.value, 10))
		setCurrentPage(1) // Скидаємо поточну сторінку на першу при зміні кількості записів на сторінці
	}
	// Функція для відправки запиту на сервер
	const handleSubmit = async e => {
		e.preventDefault()
		await handleFetch(true)
	}
	// Функція для переходу на сторінку з детальною інформацією про особу
	const handlePersonInfo = person => {
		router.push(`/person-info/${person.unzr}`)
	}
	// Відображення компоненту
	return (
		<div>
			<NavBar />
			<Container>
				<div>
					{/* Заголовок сторінки */}
					<h2 className='mt-5'>
						Введіть часткові данні особи щоб знайти запис в електронному
						реєстрі.
					</h2>
					{/* Компонент форми */}
					<FormComponent
						formData={formData}
						formFieldsNames={formFieldsNames}
						isDataRequired={isDataRequired}
						isFieldsDisabled={isFieldsDisabled}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
					{/* Кнопка для відправки форми */}
					<Button
						variant='primary'
						type='submit'
						form='personForm'
						className='mt-3'
					>
						Знайти особу
					</Button>
					{/* Кнопка для очищення форми */}
					<Button
						variant='secondary'
						onClick={handleClear}
						className='mt-3 ms-3'
					>
						Очистити форму
					</Button>
				</div>
				{/* Відображення пагінації, якщо є кілька сторінок результатів */}
				{totalPages > 0 && (
					<div style={{ overflowX: 'auto', marginTop: 10, marginBottom: 10 }}>
						<Pagination>
							<Pagination.Prev
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							/>
							{[...Array(totalPages)].map((_, index) => (
								<Pagination.Item
									key={index + 1}
									active={index + 1 === currentPage}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</Pagination.Item>
							))}
							<Pagination.Next
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</Pagination>
					</div>
				)}
				{/* Форма для вибору кількості записів на сторінці */}
				<Form style={{ marginBottom: 20 }}>
					<Form.Group
						controlId='formPerPage'
						className='row align-items-center'
					>
						<div className='col-sm-1'>
							<Form.Select value={perPage} onChange={handlePerPageChange}>
								<option value='10'>10</option>
								<option value='50'>50</option>
								<option value='100'>100</option>
							</Form.Select>
						</div>
						<Form.Label className='col-sm-11'>
							Кількість записів на сторінці
						</Form.Label>
					</Form.Group>
				</Form>
				{/* Відображення результатів пошуку у вигляді таблиці */}
				{results && (
					<div>
						{/* Виведення заголовка з кількістю знайдених записів */}
						<h3>
							Знайдено {totalCount}{' '}
							{totalCount % 10 === 1 && totalCount % 100 !== 11
								? 'запис'
								: totalCount % 10 >= 2 &&
								  totalCount % 10 <= 4 &&
								  (totalCount % 100 < 10 || totalCount % 100 >= 20)
								? 'записи'
								: 'записів'}
						</h3>
						{/* Таблиця з результатами пошуку */}
						<Table className='mt-4' striped bordered hover>
							<thead>
								<tr>
									{/* Виведення заголовків колонок */}
									{Object.entries(formFieldsNames).map(([key, label]) => (
										<th key={key}>{label}</th>
									))}
									<th>Дія</th>{' '}
									{/* Додавання нового заголовка для стовпця з діями */}
								</tr>
							</thead>
							<tbody>
								{/* Виведення результатів пошуку у вигляді рядків таблиці */}
								{results.map((person, index) => (
									<tr key={index}>
										{/* Виведення даних згідно назв полів форми */}
										{Object.keys(formFieldsNames).map(fieldName => (
											<td key={fieldName}>{person[fieldName]}</td>
										))}
										<td>
											{/* Кнопка для переходу на сторінку з детальною інформацією */}
											<Button
												variant='dark'
												onClick={() => handlePersonInfo(person)}
											>
												Інфо
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
			</Container>
		</div>
	)
}
