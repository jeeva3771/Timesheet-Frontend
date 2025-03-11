import { Controller } from 'react-hook-form'
import { Form, Row, Col } from 'react-bootstrap'

const FormInput = ({
	control,
	id,
	label,
	name,
	containerClass,
	placeholder,
	labelClassName,
	className,
	type,
	modify,
	noValidate,
	mandatoryField,
	...other
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{modify ? (
						<Row className="mb-3">
							{label && (
								<Form.Label className={labelClassName}>
									{label} {mandatoryField && <span className="text-danger">*</span>}
								</Form.Label>
							)}
							<Col sm="10">
								<Form.Control
									className={className}
									id={id ?? name}
									type={type}
									placeholder={placeholder}
									isInvalid={!noValidate && fieldState.error != null}
									{...other}
									{...field}
								/>
								{!noValidate && fieldState.error?.message && (
									<Form.Control.Feedback type="invalid" className="text-danger">
										{fieldState.error?.message}
									</Form.Control.Feedback>
								)}
							</Col>
						</Row>
					) : (
						<>
							{label && (
								<Form.Label className={labelClassName}>
									{label}
								</Form.Label>
							)}
								<Form.Control
									className={className}
									id={id ?? name}
									type={type}
									placeholder={placeholder}
									isInvalid={!noValidate && fieldState.error != null}
									{...other}
									{...field}
								/>
								{!noValidate && fieldState.error?.message && (
									<Form.Control.Feedback type="invalid" className="text-danger">
										{fieldState.error?.message}
									</Form.Control.Feedback>
								)}
							</>
					)}
				</Form.Group>
			)}
		/>
	)
}

export default FormInput
