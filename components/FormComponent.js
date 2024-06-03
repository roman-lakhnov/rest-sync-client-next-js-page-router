import { Form, Button } from 'react-bootstrap'

const FormComponent = ({
	formData,
	formFieldsNames,
	isDataRequired,
	handleSubmit,
	handleChange,
  isFieldsDisabled
}) => {
	return (
		<Form id="personForm" onSubmit={handleSubmit}>
			{Object.entries(formFieldsNames).map(([fieldName, label]) => (
				<Form.Group controlId={`form${fieldName}`} key={fieldName}>
					<Form.Label>{label}</Form.Label>
					{fieldName === 'dateOfBirth' ? (
						<Form.Control
							type='date'
							name={fieldName}
							value={formData[fieldName]}
							onChange={handleChange}
							required={isDataRequired[fieldName]}
              disabled={isFieldsDisabled}
						/>
					) : fieldName === 'gender' ? (
						<Form.Control
							as='select'
							name={fieldName}
							value={formData[fieldName]}
							onChange={handleChange}
							required={isDataRequired[fieldName]}
              disabled={isFieldsDisabled}
						>
							<option value=''>{label}</option>
							<option value='male'>Чоловіча</option>
							<option value='female'>Жіноча</option>
						</Form.Control>
					) : (
						<Form.Control
							type='text'
							name={fieldName}
							value={formData[fieldName]}
							onChange={handleChange}
							required={isDataRequired[fieldName]}
              disabled={isFieldsDisabled}
						/>
					)}
				</Form.Group>
			))}
		</Form>
	)
}

export default FormComponent
