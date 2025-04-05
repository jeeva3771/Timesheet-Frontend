import { Controller } from 'react-hook-form'
import { Form, Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
const FormInputPassword = ({
	control,
	id,
	label,
	name,
	containerClass,
	placeholder,
	labelClassName,
	className,
	modify,
	mandatoryField,
	...other
}) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<Controller
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{modify ? (
						<Row className="mb-3">
							{label && 
								<Form.Label className={labelClassName}>
									{label} {mandatoryField && <span className="text-danger">*</span>}
								</Form.Label>
							}
							<Col sm="10">
								<div className="input-group mb-0">
									<Form.Control
										className={className}
										{...other}
										id={id ?? name}
										{...field}
										type={showPassword ? 'text' : 'password'}
										placeholder={placeholder}
										isInvalid={fieldState.error != null}
									/>
									<div className="input-group-text input-group-password">
										<span onClick={() => setShowPassword(!showPassword)}>
											{showPassword ?  <FiEye size={18} /> : <FiEyeOff size={18} />}
										</span>
									</div>
									{fieldState.error?.message && (
										<Form.Control.Feedback type="invalid" className="text-danger">
											{fieldState.error?.message} 
										</Form.Control.Feedback>
									)}
								
								</div>
							</Col>
						</Row>
					) : (
						<>
							{label && <Form.Label className={labelClassName}>{label}</Form.Label>}
							<div className="input-group mb-0">
								<Form.Control
									className={className}
									{...other}
									id={id ?? name}
									{...field}
									type={showPassword ? 'text' : 'password'}
									placeholder={placeholder}
									isInvalid={fieldState.error != null}
								/>
								<div className={`input-group-text input-group-password `}>
									<span onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
									</span>
								</div>
								{fieldState.error?.message && (
									<Form.Control.Feedback type="invalid" className="text-danger">
										{fieldState.error?.message} 
									</Form.Control.Feedback>
								)}
							
							</div>
						</>
					)}
				</Form.Group>
			)}
			name={name}
		/>
	)
}
export default FormInputPassword
