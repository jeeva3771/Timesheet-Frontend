import { PageBreadcrumb } from '@/components'
const apiUrl = import.meta.env.VITE_API_URL
import {
	Card,
	CardBody,
	Col,
	Form,
	Row,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { saveOrUpdateUser, readUserById } from '../Api'
import { useEffect, useState } from 'react'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from '../utils/Toastoption'
import { formatDateToInput } from '../utils/util'
import styles from '../App.module.css'


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
		image: undefined,
		removeImage: false  
	})

	useEffect(() => {
        if (!userId) return
        handleReadUserById(userId)
    }, [userId])


	const handleSubmit = async () => {
        setLoading(true)
	
        const payload = {
            name: userData.name,
            dob: userData.dob,
            role: userData.role,
            status: userData.status,
            email: userData.email,
            password: userData.password,
			image: userData.image,
			removeImage: userData.removeImage
        }

        try {
            const { response, error } = await saveOrUpdateUser(userId, payload)
            if (error) {
				toast.error(error, successAndCatchErrorToastOptions)
                return
            }

            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }

			if (response.status === 403) {
				toast.error(await response.json(), errorToastOptions)
				removeUserLogged()
				navigate('/')
				return
			}

            if ([200, 201].includes(response.status)) {
				const data = await response.json()
                navigate('/users/')
				toast.success(data, successAndCatchErrorToastOptions)
            } else {
                const responseData = await response.json()
				const passwordValidate = userData.password !== userData.confirmPassword
                if (Array.isArray(responseData)) {
					if (passwordValidate) {
						responseData.push("Password and Confirm Password do not match")
					}
					toast.error(
						responseData.map((message, index) => (
							<p key={index} className="m-0 p-0">{message}</p>
						)),
						errorToastOptions
					)
                } else {
					const errorMessages = []
					if (typeof responseData === 'string') {
						errorMessages.push(responseData)
					} else if (responseData?.error) {
						errorMessages.push(responseData.error)
					}

					if (passwordValidate) {
						errorMessages.push("Password and Confirm Password do not match")
					}

					toast.error(
						<div className="text-left">
							{errorMessages.map((message, index) => (
								<p key={index} className="m-0 p-0">{message}</p>
							))}
						</div>,
						errorToastOptions
					)
                }
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
        } finally {
            setLoading(false)
        }
    }

	const handleReadUserById = async (userId) => {
        try {
            const { response, error } = await readUserById(userId)
            if (error) {
                toast.error(error, successAndCatchErrorToastOptions)
                return
            }

            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }

			if (response.status === 403) {
				toast.error(await response.json(), errorToastOptions)
				removeUserLogged()
				navigate('/')
				return
			}
            
            if (response.ok) {
                const [user] = await response.json()
				user.image = `${apiUrl}/api/users/avatar/${user.userId}/?t=${Date.now()}`
                setUserData({
					...userData,
                    name: user.name,
					dob: formatDateToInput(user.dob),
					role: user.role,
					status: user.status,
					email: user.emailId,
					image: user.image
                })
            } else {
				toast.error(await response.json(), successAndCatchErrorToastOptions)
            }
        } catch (error) {
			toast.error('Something went wrong.Please try later', successAndCatchErrorToastOptions)
        }
    }

	return (
		<>
			<PageBreadcrumb subName="Users List" title={userId ? "Edit" : "Add"} />
			<Row>
			<Col lg="12">
				<Card>
					<CardBody>
						<form>
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
													<option selected>Select a role</option>
													<option value="admin">Admin</option>
													<option value="manager">Manager</option>
													<option value="hr">HR</option>
													<option value="employee">Employee</option>
												</Form.Select>
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
													checked={userData.status === 1}
													onChange={() => setUserData({ ...userData, status: 1})}
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
													checked={userData.status === 0}
													onChange={() => setUserData({ ...userData, status: 0})}
												/>
												<label className="form-check-label" htmlFor="inActive">
													Inactive
												</label>
											</div>
										</Col>
									</Row>

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

									{!userId && (
									<>
										<Row className="mb-3">
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
														</div>
													</Col>
												</Row>
											</Form.Group>
										</Row>
										<Row className="mb-3">
											<Form.Group className="mb-3">
												<Row className="mb-3">
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
														</div>
													</Col>
												</Row>
											</Form.Group>
										</Row>
									</>
									)}
									<Row className="mb-1">
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
													{userData.image && typeof userData.image === 'string' && userId &&(
														<div className="position-relative d-inline-block mt-3">
															<img
																src={userData.image}
																alt="User"
																className={`img-thumbnail ${styles.editImageSizing}`}
															/>
															<button
																type="button"
																className={`btn btn-sm btn-danger position-absolute top-0 end-0 p-0 ${styles.editImageView}`}
																onClick={() => setUserData({ ...userData, image: "", removeImage: true })}
															>
															×
															</button>
													</div>
													)}
												</Col>
											</Row>
										</Form.Group>
									</Row>

									<Row className="d-flex justify-content-center mb-4">
										<div className="text-center">
											{!userId && (
												<button 
													type="reset" 
													className="btn btn-secondary me-2" 
													onClick={() => 
														setUserData({
															name: '',
															dob: '',
															role: '',
															status: '',
															email: '',
															password: '',
															confirmPassword: '',
															image: undefined,
															removeImage: false 
														})
													}
												>
													Reset
												</button>
											)}
											<button
												type="button"
												className="btn btn-primary"
												onClick={handleSubmit}
												disabled={loading}
											>
												{userId ? 'Update' : 'Submit'}
											</button>
										</div>
									</Row>
								</Col>
							</Row>
						</form>
					</CardBody>
				</Card>
			</Col>
		</Row>
		</>
	)
}

export default  userForm

