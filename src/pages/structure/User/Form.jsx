import { FormInputPassword, PageBreadcrumb, SelectInput } from '@/components'
import FormInput from '@/components/form/FormTextInput'
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Form,
	FormControl,
	FormLabel,
	FormSelect,
	InputGroup,
	Row,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


export const TextualInputs = ({
	value,
	label,
	placeholder,
	type, 
	onChange
}) => {
	const { control } = useForm()
	const navigate = useNavigate()


	const handleChange = (event) => {
		const {value} = event.target
		onChange(value)
		// const 
	}

	const handleSubmit = () => {
		navigate("/user/")
	}
	return (
		<>
		<PageBreadcrumb subName="Users List" title="Add" />
		<Row>
			<Col lg="12">
				<Card>
					<CardBody>
						<Row className="d-flex justify-content-center">
						
							<Col lg="6">
								<h2 className="text-center">User Form</h2>
								<Row className="my-4">
									<FormInput  
										containerClass="mb-3" 
										type="text"
										control={control}
										name="Text"
										label="Name"
										value={value}
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/> 
								</Row>

								<Row className="mb-3">
									<FormInput 
										containerClass="mb-3" 
										type="date"
										control={control}
										name="Dob"
										label="DOB"
										value={value}
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/> 
								</Row>

								<Row className="mb-3">
									<SelectInput
										name="Role"
										label="Role"
										labelClassName="col-sm-2 col-form-label text-end"
										containerClass="mb-3"
										control={control}
										value={value}
										modify={true}
										mandatoryField={true}
									>
										<option disabled selected>Select a role</option>
										<option>Admin</option>
										<option>Manager</option>
										<option>HR</option>
										<option>Employee</option>
									</SelectInput>
								</Row>

								<Row className="mb-3">
									<FormInput 
										containerClass="mb-3" 
										type="email"
										control={control}
										name="Email"
										label="Email"
										value={value}
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/> 
								</Row>

								<Row className="mb-3">
									<FormInputPassword 
										containerClass="mb-3" 
										type="password"
										control={control}
										name="password"
										value={value}
										label="Password"
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/> 
								</Row>

								<Row className="mb-3">
									<FormInputPassword 
										containerClass="mb-3" 
										type="password"
										control={control}
										name="Confirm Password"
										value={value}
										label={<span>Confirm <br /> Password</span>}
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/> 
								</Row>
								
								<Row className="mb-1">
									<FormInput 
										containerClass="mb-3" 
										type="file"
										control={control}
										name="Image upload"
										label="Image Upload (optional)"
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
									/> 
								</Row>
								<Row className="d-flex justify-content-center mb-4">
									<div className="text-center">
										<button 
											type="reset" 
											className="btn btn-secondary me-2" 
										>
											Reset
										</button>
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleSubmit}
										>
										Submit
										</button>
									</div>
								</Row>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
		</>
	)
}

export default TextualInputs

// const TextualInputs = () => {
// 	return (
// 		<Row>
// 			<Col lg="12">
// 				<Card>
// 					<CardBody>
// 						<Row>
// 							<Col lg="6">
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-text-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Text
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="text"
// 											defaultValue="Artisanal kale"
// 											id="example-text-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-email-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Email
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="email"
// 											defaultValue="bootstrap@example.com"
// 											id="example-email-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-tel-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Telephone
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="tel"
// 											defaultValue="1-(555)-555-5555"
// 											id="example-tel-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-password-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Password
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="password"
// 											defaultValue="hunter2"
// 											id="example-password-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-number-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Number
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="number"
// 											defaultValue={42}
// 											id="example-number-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-datetime-local-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Date and time
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="datetime-local"
// 											defaultValue="2011-08-19T13:45:00"
// 											id="example-datetime-local-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="exampleColorInput"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Color
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="color"
// 											id="exampleColorInput"
// 											defaultValue="#0b51b7"
// 											title="Choose your color"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel className="col-sm-2 col-form-label text-end">
// 										Select
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormSelect>
// 											<option defaultValue="Open this select menu">
// 												Open this select menu
// 											</option>
// 											<option value={1}>One</option>
// 											<option value={2}>Two</option>
// 											<option value={3}>Three</option>
// 										</FormSelect>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-text-input-lg"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Large
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											size="lg"
// 											type="text"
// 											placeholder=".form-control-lg"
// 											id="example-text-input-lg"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-text-input-sm"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Small
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											size="sm"
// 											type="text"
// 											placeholder=".form-control-sm"
// 											id="example-text-input-sm"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3 mb-lg-0">
// 									<FormLabel
// 										htmlFor="example-search-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Search
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="search"
// 											defaultValue="How do I shoot web"
// 											id="example-search-input"
// 										/>
// 									</Col>
// 								</Row>
// 							</Col>
// 							<Col lg="6">
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-url-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										URL
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="url"
// 											defaultValue="https://getbootstrap.com"
// 											id="example-url-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-date-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Date
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="date"
// 											defaultValue="2011-08-19"
// 											id="example-date-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-month-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Month
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="month"
// 											defaultValue="2011-08"
// 											id="example-month-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-week-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Week
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="week"
// 											defaultValue="2011-W33"
// 											id="example-week-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3">
// 									<FormLabel
// 										htmlFor="example-time-input"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Time
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="time"
// 											defaultValue="13:45:00"
// 											id="example-time-input"
// 										/>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3 has-success">
// 									<FormLabel
// 										htmlFor="inputHorizontalSuccess"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Email
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="email"
// 											className="form-control-success"
// 											id="inputHorizontalSuccess"
// 											placeholder="name@example.com"
// 										/>
// 										<div className="form-control-feedback">
// 											Success! You've done it.
// 										</div>
// 										<small className="form-text text-muted">
// 											Example help text that remains unchanged.
// 										</small>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3 has-warning">
// 									<FormLabel
// 										htmlFor="inputHorizontalWarning"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Email
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="email"
// 											className="form-control-warning"
// 											id="inputHorizontalWarning"
// 											placeholder="name@example.com"
// 										/>
// 										<div className="form-control-feedback">
// 											Shucks, check the formatting of that and try again.
// 										</div>
// 										<small className="form-text text-muted">
// 											Example help text that remains unchanged.
// 										</small>
// 									</Col>
// 								</Row>
// 								<Row className="mb-3 has-error">
// 									<FormLabel
// 										htmlFor="inputHorizontalDnger"
// 										className="col-sm-2 col-form-label text-end"
// 									>
// 										Email
// 									</FormLabel>
// 									<Col sm="10">
// 										<FormControl
// 											type="email"
// 											className="form-control-danger"
// 											id="inputHorizontalDnger"
// 											placeholder="name@example.com"
// 										/>
// 										<div className="form-control-feedback">
// 											Sorry, that username's taken. Try another?
// 										</div>
// 										<small className="form-text text-muted">
// 											Example help text that remains unchanged.
// 										</small>
// 									</Col>
// 								</Row>
// 							</Col>
// 						</Row>
// 					</CardBody>
// 				</Card>
// 			</Col>
// 		</Row>
// 	)
// }

/////////////////////////////////////////

// const InputGroupsStatic = () => {
// 	return (
// 		<Col lg="6">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Input groups Static</CardTitle>
// 					<p className="text-muted mb-0">
// 						Easily extend form controls by adding text, buttons, or button
// 						groups on either side of textual inputs, custom selects, and custom
// 						file inputs.
// 					</p>
// 				</CardHeader>
// 				<CardBody>
// 					<InputGroup className="mb-3">
// 						<span className="input-group-text" id="basic-addon1">
// 							@
// 						</span>
// 						<FormControl
// 							type="text"
// 							placeholder="Username"
// 							aria-label="Username"
// 							aria-describedby="basic-addon1"
// 						/>
// 					</InputGroup>
// 					<InputGroup className="mb-3">
// 						<FormControl
// 							type="text"
// 							placeholder="Recipient's username"
// 							aria-label="Recipient's username"
// 							aria-describedby="basic-addon2"
// 						/>
// 						<span className="input-group-text" id="basic-addon2">
// 							@mannatthemes.com
// 						</span>
// 					</InputGroup>
// 					<FormLabel htmlFor="basic-url">Your vanity URL</FormLabel>
// 					<InputGroup className="mb-3">
// 						<span className="input-group-text" id="basic-addon3">
// 							https://mannatthemes.com
// 						</span>
// 						<FormControl
// 							type="text"
// 							id="basic-url"
// 							aria-describedby="basic-addon3"
// 						/>
// 					</InputGroup>
// 					<InputGroup className="mb-3">
// 						<span className="input-group-text">$</span>
// 						<FormControl
// 							type="text"
// 							aria-label="Amount (to the nearest dollar)"
// 						/>
// 						<span className="input-group-text">.00</span>
// 					</InputGroup>
// 					<InputGroup className="mb-3">
// 						<FormControl
// 							type="text"
// 							placeholder="Username"
// 							aria-label="Username"
// 						/>
// 						<span className="input-group-text">@</span>
// 						<FormControl type="text" placeholder="Server" aria-label="Server" />
// 					</InputGroup>
// 					<InputGroup>
// 						<span className="input-group-text">With textarea</span>
// 						<FormControl
// 							as="textarea"
// 							aria-label="With textarea"
// 							defaultValue={''}
// 						/>
// 					</InputGroup>
// 				</CardBody>
// 			</Card>
// 		</Col>
// 	)
// }
// const InputGroupsButtons = () => {
// 	return (
// 		<Col lg="6">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Input groups Buttons</CardTitle>
// 					<p className="text-muted mb-0">
// 						Easily extend form controls by adding text, buttons, or button
// 						groups on either side of textual inputs, custom selects, and custom
// 						file inputs.
// 					</p>
// 				</CardHeader>
// 				<CardBody>
// 					<Form>
// 						<Row className="mb-3">
// 							<Col md="6">
// 								<InputGroup>
// 									<div className="input-group-text">
// 										<input className="form-check-input mt-0" type="checkbox" />
// 									</div>
// 									<FormControl
// 										type="text"
// 										aria-label="Text input with checkbox"
// 									/>
// 								</InputGroup>
// 							</Col>
// 							<Col md="6">
// 								<InputGroup>
// 									<div className="input-group-text">
// 										<input className="form-check-input mt-0" type="radio" />
// 									</div>
// 									<FormControl
// 										type="text"
// 										aria-label="Text input with radio button"
// 									/>
// 								</InputGroup>
// 							</Col>
// 						</Row>
// 						<InputGroup className="mb-3">
// 							<Button variant="secondary" type="button" id="button-addon1">
// 								<i className="fas fa-search" />
// 							</Button>
// 							<FormControl
// 								type="text"
// 								aria-label="Example text with button addon"
// 								aria-describedby="button-addon1"
// 							/>
// 						</InputGroup>
// 						<InputGroup className="mb-3">
// 							<FormControl
// 								type="text"
// 								placeholder="Search"
// 								aria-label="Recipient's username"
// 								aria-describedby="button-addon2"
// 							/>
// 							<Button variant="secondary" type="button" id="button-addon2">
// 								Go!
// 							</Button>
// 						</InputGroup>
// 						<InputGroup className="mb-3">
// 							<FormControl
// 								type="email"
// 								placeholder="Email"
// 								aria-label="Email"
// 								aria-describedby="button-addon3"
// 							/>
// 							<Button variant="secondary" type="button" id="button-addon2">
// 								Submit
// 							</Button>
// 						</InputGroup>
// 						<InputGroup>
// 							<FormSelect
// 								id="inputGroupSelect04"
// 								aria-label="Example select with button addon"
// 							>
// 								<option defaultValue="Choose...">Choose...</option>
// 								<option value={1}>One</option>
// 								<option value={2}>Two</option>
// 								<option value={3}>Three</option>
// 							</FormSelect>
// 							<Button variant="secondary" type="button">
// 								Button
// 							</Button>
// 						</InputGroup>
// 					</Form>
// 				</CardBody>
// 			</Card>
// 		</Col>
// 	)
// }
// const Elements = () => {
// 	return (
// 		<>
// 			<PageBreadcrumb title="Manager Form" subName="Forms" />
// 			<TextualInputs />
// 		</>
// 	)
// }
// export default Elements





