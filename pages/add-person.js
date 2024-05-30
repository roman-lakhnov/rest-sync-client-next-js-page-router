// pages/add-person.js
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '../components/NavBar'
import { Container, Form, Button } from 'react-bootstrap'
import FormComponent from '../components/FormComponent'

export default function AddPerson({ blankFormData, formFieldsNames }) {
	const router = useRouter()
	const [formData, setFormData] = useState({ ...blankFormData })
	const [isFieldsDisabled, setIsFieldsDisabled] = useState(false)
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

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleClear = () => {
		setFormData({ ...blankFormData })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(formData)
		try {
			const response = await fetch(`${process.env.API_URL}/person`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			if (response.ok) {
				alert('Запис доданий до електронного реєстру. Профіль особи створено. ')
				router.push(`/person-info/${formData.unzr}`)
			} else {
				const data = await response.json()
				const textMessage = JSON.stringify(data)
				alert(`Помилка. Особу не вдалося додати до реєстру ${textMessage}`)
			}
		} catch (error) {
			console.error('Error:', error)
			alert(`Помилка. Особу не вдалося додати до реєстру  ${error}`)
		}
	}

	return (
		<div>
			<NavBar />
			<Container>
				<div>
					<h2 className='mt-5'>
						Введіть повні данні особи щоб додати запис до електронного реєстру.
					</h2>
					<FormComponent
						formFieldsNames={formFieldsNames}
						formData={formData}
						isDataRequired={isDataRequired}
						isFieldsDisabled={isFieldsDisabled}
						submitButtonText='Надіслати форму і створити особу'
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					/>
					<Button variant='secondary' onClick={handleClear} className='mt-3'>
						Очистити форму
					</Button>
					<Button
						variant='success'
						type='submit'
						form='personForm'
						className='mt-3 ms-3'
					>
						Надіслати форму і створити особу
					</Button>
				</div>
			</Container>
		</div>
	)
}
