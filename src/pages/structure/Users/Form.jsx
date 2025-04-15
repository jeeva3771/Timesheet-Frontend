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
import { useNavigate, useParams } from 'react-router-dom'
import { saveOrUpdateUser } from '../Api'
import { useState } from 'react'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { toast } from "sonner"
import { errorToastOptions } from '../error'

const userForm = () => {
	const { userId } = useParams()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const { removeUserLogged } = useAuthContext()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [userData, setUserData] = useState({
		name: undefined,
		dob: undefined,
		role: undefined,
		status: undefined,
		email: undefined,
		password: undefined,
		confirmPassword: undefined,
		image: undefined
	})

	const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            name: userData.name,
            dob: userData.dob,
            role: userData.role,
            status: userData.status,
            email: userData.email,
            password: userData.password,
			image: userData.image
        }

        try {
            const { response, error } = await saveOrUpdateUser(userId, payload)
            if (error) {
                alert(error)
                return
            }

            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }

            if ([200, 201].includes(response.status)) {
                navigate('/users/')
            } else {
                const responseData = await response.json()
                if (Array.isArray(responseData)) {
                    const errorMessage = responseData.join('\n')
                    // alert(errorMessage)
					toast.error(errorMessage, errorToastOptions)

                } else {
                    alert(responseData.error || responseData)
                }
            }
        } catch (error) {
            alert("Something went wrong. Please try later.")
        } finally {
            setLoading(false)
        }
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
									<Form.Group className="mb-3">
										<Row>
											<Form.Label 
												htmlFor="name" 
												className="col-sm-2 col-form-label text-end"
											>Name <span className="text-danger">*</span>
											</Form.Label>
											<Col sm="10">
												<Form.Control
													id="name"
													name="email"
													type="text"
													value={userData.name}
													onChange={(e) => setUserData({ ...userData, name: e.target.value })}
												/>
											</Col>
										</Row>
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group className="mb-3">
										<Row>
											<Form.Label 
												htmlFor="dob" 
												className="col-sm-2 col-form-label text-end"
											>DOB <span className="text-danger">*</span>
											</Form.Label>
											<Col sm="10">
												<Form.Control
													id="dob"
													type="date"
													value={userData.dob}
													onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
												/>
											</Col>
										</Row>
									</Form.Group>
								</Row>

								{/* <Row className="mb-2"> */}
									{/* <SelectInput
										name="Role"
										label="Role"
										labelClassName="col-sm-2 col-form-label text-end"
										containerClass="mb-2"
										// control={control}
										value={value}
										modify={true}
										mandatoryField={true}
									>
										<option disabled selected>Select a role</option>
										<option>Admin</option>
										<option>Manager</option>
										<option>HR</option>
										<option>Employee</option>
									</SelectInput> */}

									{/* <select
										className="form-select"
										id="blockCode"
										value={room.blockCode}
										onChange={(e) => {
											const selectedBlock = e.target.value;
											setRoom({ ...room, blockCode: selectedBlock })
											if (selectedBlock) {
												handleFloorNumbers(selectedBlock, true)
											}
										}}
									>
										<option disabled selected>Select a role</option>
										<option>Admin</option>
										<option>Manager</option>
										<option>HR</option>
										<option>Employee</option>
									</select> */}
								<Form.Group className="mb-2">
									<Row className="mb-3">			
										<Form.Label 
											className="col-sm-2 col-form-label text-end" 
											htmlFor="role"
										>Role <span className="text-danger">*</span>
										</Form.Label>
										<Col sm="10">
											<Form.Select
												className="form-select"
												id="role"
												value={userData.role}
												onChange={(e) => {setUserData({ ...userData, role: e.target.value })												}}
											>
												<option disabled selected>Select a role</option>
												<option value="admin">Admin</option>
												<option value="manager">Manager</option>
												<option value="hr">HR</option>
												<option value="employee">Employee</option>
											</Form.Select>
											{/* {fieldState.error?.message && (
												<Form.Control.Feedback type="invalid" className="text-danger">
													{fieldState.error?.message}
												</Form.Control.Feedback>
											)} */}
										</Col>
									</Row>
								</Form.Group>

								<Row className="mb-4">
									<label className="col-sm-2 col-form-label text-end">
										Status <span className="text-danger">*</span>
									</label>
									<Col md="9" className="mt-2">
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												id="active"
												name="status"
												value={1}
												onChange={(e) => setUserData({ ...userData, status: 1})}
											/>
											<label className="form-check-label" htmlFor="active">
												Active
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												id="inActive"
												name="status"
												value={0}
												onChange={(e) => setUserData({ ...userData, status: 0})}
											/>
											<label className="form-check-label" htmlFor="inActive">
												Inactive
											</label>
										</div>
									</Col>
								</Row>

								{/* <Row className="mb-3"> */}
									{/* <FormInput 
										containerClass="mb-3" 
										type="email"
										// control={control}
										name="Email"
										label="Email"
										value={value}
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/>  */}


								{/* </Row> */}

								<Row className="mb-3">
									<Form.Group className="mb-3">
										<Row>
											<Form.Label 
												htmlFor="email" 
												className="col-sm-2 col-form-label text-end"
											>Email <span className="text-danger">*</span>
											</Form.Label>
											<Col sm="10">
												<Form.Control
													id="email"
													type="email"
													value={userData.email}
													onChange={(e) => setUserData({ ...userData, email: e.target.value })}
												/>
											</Col>
										</Row>
									</Form.Group>
								</Row>


								<Row className="mb-3">
									{/* <FormInputPassword 
										containerClass="mb-3" 
										type="password"
										// control={control}
										name="password"
										value={value}
										label="Password"
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
										mandatoryField={true}
									/>  */}
									<Form.Group className="mb-3">
										<Row className="mb-3">
											<Form.Label 
												htmlFor="confirmPassword" 
												className="col-sm-2 col-form-label text-end"
											>Password <span className="text-danger">*</span>
											</Form.Label>
											<Col sm="10">
												<div className="input-group mb-0">
													<Form.Control
														id="confirmPassword"
														type={showPassword ? "text" : "password"}
														value={userData.password}
														onChange={(e) => setUserData({ ...userData, password: e.target.value })}
													/>
													<div className="input-group-text input-group-password">
														<span onClick={() => setShowPassword(!showPassword)}>
															{showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
														</span>
													</div>
													{/* {fieldState.error?.message && (
														<Form.Control.Feedback type="invalid" className="text-danger">
															{fieldState.error?.message} 
														</Form.Control.Feedback>
													)} */}
												</div>
											</Col>
										</Row>
									</Form.Group>
								</Row>
								<Row className="mb-3">
									<Form.Group className="mb-3">
										<Row className="mb-3">
										{/* <FormInputPassword 
											containerClass="mb-3" 
											type="password"
											// control={control}
											name="Confirm Password"
											value={value}
											label={<span>Confirm <br /> Password</span>}
											labelClassName="col-sm-2 col-form-label text-end"
											modify={true}
											mandatoryField={true}
										/>  */}
											<Form.Label 
												htmlFor="password" 
												className="col-sm-2 col-form-label text-end"
											><span>Confirm <br /> Password</span><span className="text-danger">*</span>
											</Form.Label>
											<Col sm="10">
												<div className="input-group mb-0">
													<Form.Control
														id="password"
														type={showConfirmPassword ? "text" : "password"}
														value={userData.confirmPassword}
														onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
													/>
													<div className="input-group-text input-group-password">
														<span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
															{showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
														</span>
													</div>
													{/* {fieldState.error?.message && (
														<Form.Control.Feedback type="invalid" className="text-danger">
															{fieldState.error?.message} 
														</Form.Control.Feedback>
													)} */}
												</div>
											</Col>
										</Row>
									</Form.Group>
								</Row>
								
								<Row className="mb-1">
									{/* <FormInput 
										containerClass="mb-3" 
										type="file"
										// control={control}
										name="Image upload"
										label="Image Upload (optional)"
										labelClassName="col-sm-2 col-form-label text-end"
										modify={true}
									/>  */}
									<Form.Group className="mb-3">
										<Row>
											<Form.Label 
												htmlFor="imageUpload" 
												className="col-sm-2 col-form-label text-end"
											>Image upload <b>(optional)</b>
											</Form.Label>
											<Col sm="10">
												<Form.Control
													id="imageUpload"
													type="file"
													name="image"
													onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
												/>
											</Col>
										</Row>
									</Form.Group>
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
											disabled={loading}
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

export default  userForm

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
// 			< />
// 		</>
// 	)
// }
// export default Elements





