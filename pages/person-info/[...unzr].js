// pages/person/[...id].js

import FormComponent from '@/components/Form'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

const PersonInfo = ({ blankFormData, formFieldsNames }) => {
	const router = useRouter()
	const { unzr } = router.query
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState({ ...blankFormData })
	const [isFieldsDisabled, setIsFieldsDisabled] = useState(true)
	const [showToast, setShowToast] = useState(false) // State for toast visibility
	const [isDataRequired, setIsDataRequired] = useState({
		name: true,
		surname: true,
		patronym: false,
		dateofbirth: true,
		rnokpp: true,
		unzr: true,
		passportNumber: true,
		sex: true
	})

	useEffect(() => {
		fetchPersonInfo()
	}, [unzr])

	const fetchPersonInfo = async () => {
		console.log(unzr)
		if (unzr) {
			try {
				const response = await fetch(
					`${process.env.API_URL}/person/unzr/${unzr}`,
					{
						method: 'GET',
						headers: {
						}
					}
				)
				if (response.ok) {
					const data = await response.json()
					setFormData(data)
				} else {
					console.error('Failed to fetch person information')
				}
			} catch (error) {
				console.error('Error:', error)
			} finally {
				setLoading(false)
			}
		}
	}

	const toggleDisabled = () => {
		setIsFieldsDisabled(!isFieldsDisabled)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

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
				setShowToast(true) // Show toast on success
				setIsFieldsDisabled(!isFieldsDisabled)
			} else {
				console.error('Failed to update person:', response.statusText)
			}
		} catch (error) {
			console.error('Error updating person:', error)
		}
	}

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
				setFormData({ ...blankFormData })
				router.push(`/find-person`)
			} else {
				console.error('Failed to delete person:', response.statusText)
			}
		} catch (error) {
			console.error('Error deleting person:', error)
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<NavBar />
			<Container>
				<h2 className='mt-5'>Профіль особи</h2>
				<FormComponent
					formData={formData}
					formFieldsNames={formFieldsNames}
					isDataRequired={isDataRequired}
					isFieldsDisabled={isFieldsDisabled}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
				/>
				<Button variant='dark' onClick={toggleDisabled} className='mt-3'>
					{isFieldsDisabled
						? 'Розблокувати запис'
						: 'Заблокувати\u00A0\u00A0\u00A0запис'}
				</Button>
				<Button
					variant='success'
					type='submit'
					form='personForm'
					className='mt-3 ms-3'
					disabled={isFieldsDisabled}
				>
					Зберегти зміни
				</Button>
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
