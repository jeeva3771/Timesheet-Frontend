import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
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
	noValidate,
	...other
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{label && <Form.Label className={labelClassName}>{label}</Form.Label>}
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
				</Form.Group>
			)}
		/>
	)
}
export default FormInput



// import { Controller } from 'react-hook-form';
// import { Form, Row, Col } from 'react-bootstrap';

// const FormInput = ({
// 	control,
// 	id,
// 	label,
// 	name,
// 	containerClass,
// 	placeholder,
// 	labelClassName,
// 	className,
// 	type,
// 	modify,  // ✅ modify is now properly passed as a prop
// 	noValidate,
// 	...other
// }) => {
// 	return (
// 		<Controller
// 			name={name}
// 			control={control}
// 			defaultValue={''}
// 			render={({ field, fieldState }) => (
// 				<Form.Group className={containerClass}>
// 					{label && (
// 						<Form.Label className={labelClassName} {...(modify === "true" ? { as: Row } : null)}>
// 							{label}
// 						</Form.Label>
// 					)}
// 					{modify === "true" ? (
// 						<Row>
// 							<Col sm="10">
// 								<Form.Control
// 									className={className}
// 									id={id ?? name}
// 									type={type}
// 									placeholder={placeholder}
// 									isInvalid={!noValidate && fieldState.error != null}
// 									{...other}
// 									{...field}
// 								/>
// 								{!noValidate && fieldState.error?.message && (
// 									<Form.Control.Feedback type="invalid" className="text-danger">
// 										{fieldState.error?.message}
// 									</Form.Control.Feedback>
// 								)}
// 							</Col>
// 						</Row>
// 					) : (
// 						<>
// 							<Form.Control
// 								className={className}
// 								id={id ?? name}
// 								type={type}
// 								placeholder={placeholder}
// 								isInvalid={!noValidate && fieldState.error != null}
// 								{...other}
// 								{...field}
// 							/>
// 							{!noValidate && fieldState.error?.message && (
// 								<Form.Control.Feedback type="invalid" className="text-danger">
// 									{fieldState.error?.message}
// 								</Form.Control.Feedback>
// 							)}
// 						</>
// 					)}
// 				</Form.Group>
// 			)}
// 		/>
// 	);
// };

// export default FormInput;
