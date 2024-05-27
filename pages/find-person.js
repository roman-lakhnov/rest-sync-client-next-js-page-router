import FormComponent from '@/components/Form'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Container, Form, Pagination, Table } from 'react-bootstrap'

export default function FindPerson({ blankFormData, formFieldsNames }) {
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
		dateofbirth: false,
		rnokpp: false,
		unzr: false,
		passportNumber: false,
		sex: false
	})
	// Fetch data when currentPage or perPage changes
	useEffect(() => {
		handleFetch()
	}, [currentPage, perPage])

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleClear = () => {
		setFormData({ ...blankFormData })
	}

	const handleFetch = async (pageReset = false, e) => {
		if (e) {
			e.preventDefault()
		}
		if (pageReset) {
			setCurrentPage(1)
		}
		console.log(formData)
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
				headers: {
					'Uxp-Client': `${process.env.HEADER_UXP_CLIENT}`,
					'Uxp-Service': `${process.env.HEADER_UXP_CLIENT}`
				}
			})
			if (response.ok) {
				const data = await response.json()
				setResults(data)
				// Set total pages based on total number of records
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

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	const handlePerPageChange = e => {
		setPerPage(parseInt(e.target.value, 10))
		setCurrentPage(1) // Reset currentPage to 1 when changing perPage
	}

	const handleSubmit = async e => {
		e.preventDefault()
		await handleFetch(true)
	}

	const handlePersonInfo = person => {
		router.push(`/person-info/${person.unzr}`)
	}

	return (
		<div>
			<NavBar />
			<Container>
				<div>
					<h2 className='mt-5'>
						Введіть часткові данні особи щоб знайти запис в електронному
						реєстрі.
					</h2>
					<FormComponent
						formData={formData}
						formFieldsNames={formFieldsNames}
						isDataRequired={isDataRequired}
						isFieldsDisabled={isFieldsDisabled}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
					<Button
						variant='primary'
						type='submit'
						form='personForm'
						className='mt-3'
					>
						Знайти особу
					</Button>
					<Button
						variant='secondary'
						onClick={handleClear}
						className='mt-3 ms-3'
					>
						Очистити форму
					</Button>
				</div>
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
				{results && (
					<div>
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
						<Table className='mt-4' striped bordered hover>
							<thead>
								<tr>
									{Object.entries(formFieldsNames).map(([key, label]) => (
										<th key={key}>{label}</th>
									))}
									<th>Дія</th> {/* Add a new header for the action column */}
								</tr>{' '}
							</thead>
							<tbody>
								{/* Map through results and render table rows */}
								{results.map((person, index) => (
									<tr key={index}>
										{Object.keys(formFieldsNames).map(fieldName => (
											<td key={fieldName}>{person[fieldName]}</td>
										))}
										<td>
											{' '}
											{/* Add a button to view person's information */}
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
