import { PageMetaData } from '@/components'
import { Button, Card, CardBody, Col, Row, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../auth/AuthLayout'
import logoSm from '@/assets/images/cb.png'
import styles from '../App.module.css'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useState } from 'react'
import { authentication } from '../Api'
import { useAuthContext } from '@/context'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions } from '../utils.js/Toastoption'

const Login = () => {
	const navigate = useNavigate()
	const { saveUserLogged } = useAuthContext()
	const [loginData, setLoginData] = useState({
		email: 'jeeva37710@gmail.com',
		password: '123456@'
	})
    const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const loginUser = async () => {
		try {
			setIsLoading(true)
			const { response, error } = await authentication(loginData.email, loginData.password)
	
			if (error) {
				toast.error(error, successAndCatchErrorToastOptions)
				return
			}
	
			if (response.status === 200) {
				const user = await response.json()
				saveUserLogged(user)
				
				toast.success('Successfully logged in....', successAndCatchErrorToastOptions)
				
				const role = user?.role
				if (role === 'admin' || role === 'manager') {
					navigate('/dashboard/')
				} else if (role === 'employee' || role === 'hr') {
					navigate('/timesheets/user/')
				} else {
					navigate('/') 
				}
				return
			} else {
				const errorData = await response.json()
				toast.error(errorData || 'Login failed', successAndCatchErrorToastOptions)
			}
		} catch (error) {
			toast.error('Something went wrong. Please try later', successAndCatchErrorToastOptions)
		} finally {
			setIsLoading(false)
		}
	}
	
	return (
		<>
			<PageMetaData title="Login" />
			{/* {isAuthenticated && <Navigate to={redirectUrl} replace />} */}
			<AuthLayout>
				<Card>
					<CardBody className={`p-0 ${styles.logoBg}`}>
						<div className="text-center p-3">
							<Link to="/" className="logo logo-admin">
								<img
									src={logoSm}
									alt="logo"
									className={`auth-logo ${styles.imageSizing}`}
								/>
							</Link>
							<h4 className="mt-2 mb-1 fw-semibold text-white font-18">
								Time Sheet
							</h4>
							<p className={`mb-0 ${styles.fontClr}`}>
								Sign in to continue...
							</p>
						</div>
					</CardBody>
					<CardBody className="pt-0 my-4">

							{/* <FormTextInput
								name="email"
								label="Email"
								containerClass="mb-2"
								value="jeeva37710@gmail.com"
								control={control}
								placeholder="Enter email"
							/> */}
							<Form.Group className="mb-2">
								<Form.Label htmlFor="email">Email</Form.Label>
								<Form.Control
									id="email"
									name="email"
									type="email"
									value={loginData.email}
									placeholder="Enter email"
									onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
								/>
							</Form.Group>
								
							{/* <FormInputPassword
								name="password"
								label="Password"
								value="123456@"
								control={control}
								placeholder="Enter password"
							/> */}
							<Form.Group>
							<Form.Label htmlFor="password">Password</Form.Label>
								<div className="input-group mb-0">
									<Form.Control
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										value={loginData.password}
										onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
							</Form.Group>	
							<Row className="form-group mt-3">
								<Col sm="12" className="text-end">
									<Link 
										to="/resetpassword/" 
										className="text-muted font-13"
									>
										<i className="dripicons-lock" /> Forgot password?
									</Link>
								</Col>
							</Row>
							<Row className="form-group mb-0">
								<Col xs={12}>	
									<div className="d-grid mt-3">
										<Button 
											variant="primary" 
											onClick={loginUser}  
											disabled={isLoading} 
											type="submit">
											Log In<i className="fas fa-sign-in-alt ms-1" />
										</Button>
									</div>
								</Col>
							</Row>
					</CardBody>
				</Card>
			</AuthLayout>
		</>
	)
}
export default Login
