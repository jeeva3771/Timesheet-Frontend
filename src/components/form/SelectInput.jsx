import { Controller } from 'react-hook-form'
import { Form, Col, Row } from 'react-bootstrap'
const SelectInput = ({
	control,
	id,
	label,
	name,
	containerClass,
	labelClassName,
	className,
	children,
	modify,
	mandatoryField,
	...other
}) => {
	return (
		<Controller
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => {
				if (other.multiple) {
					field.value = [field.value]
				}
				return (
					<Form.Group className={containerClass}>
						{modify ? (
							<Row className="mb-3">						
								{label && (
									<Form.Label className={labelClassName}>
										{label} {mandatoryField && <span className="text-danger">*</span>}
									</Form.Label>
								)}
								<Col sm="10">
									<Form.Select
										id={id ?? name}
										className={className}
										isInvalid={fieldState.error != null}
										{...field}
										{...other}
									>
										{children}
									</Form.Select>
									{fieldState.error?.message && (
										<Form.Control.Feedback type="invalid" className="text-danger">
											{fieldState.error?.message}
										</Form.Control.Feedback>
									)}
								</Col>
							</Row>
						) : (
							<>
								{label && (
									<Form.Label className={labelClassName}>{label}</Form.Label>
								)}
								<Form.Select
									id={id ?? name}
									className={className}
									isInvalid={fieldState.error != null}
									{...field}
									{...other}
								>
									{children}
								</Form.Select>
								{fieldState.error?.message && (
									<Form.Control.Feedback type="invalid" className="text-danger">
										{fieldState.error?.message}
									</Form.Control.Feedback>
								)}
							</>	
						)}
					</Form.Group>
				)
			}}
			name={name}
		/>
	)
}
export default SelectInput
