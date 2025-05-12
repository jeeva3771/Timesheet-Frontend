import { Button, Card, CardBody, Col, Row, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormInputPassword, FormTextInput, PageMetaData } from '@/components'
import { useState } from 'react'
import { generateOtp, resetPassword } from '../structure/Api'
import { errorToastOptions, successAndCatchErrorToastOptions } from '../structure/utils/Toastoption'
import { toast } from 'sonner'
import { useAuthContext } from '@/context'
import logoSm from '@/assets/images/cb.png'
import styles from '../structure/App.module.css'


const ResetPassword = () => {
	const [otpSent, setOtpSent] = useState(false)
	const { removeUserLogged } = useAuthContext()
	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState('')
	const [password, setPassword] = useState({
		newPassword: '',
		confirmPassword: ''
	})
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	// const schemaResolver = yup.object().shape({
	// 	email: yup
	// 		.string()
	// 		.required('Please enter Email')
	// 		.email('Please enter valid Email'),
	// })
	// const { control, handleSubmit } = useForm({
	// 	resolver: yupResolver(schemaResolver),
	// })

	const handleGenerateOtp = async () => {
		try {
			setLoading(true)
			const payload = { "emailId": email }
			const { response, error } = await generateOtp(payload)
			if (error) {
				toast.error(error, errorToastOptions)
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

			if (response.status === 200) {
				setOtpSent(true)
			} else {
				const result = await response.json()
				toast.error(result, errorToastOptions)
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		} finally {
			setLoading(false)
		}
	}

	const handleOtpAndPassword = async () => {
		try {
			setLoading(true)			
			const payload = { 
				"password": password.newPassword,
				"confirmPassword": password.confirmPassword,
				"otp": otp

			}
			const { response, error } = await resetPassword(payload)
			if (error) {
				toast.error(error, errorToastOptions)
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

			if (response.status === 200) {
				toast.success("Password reset successfully", successAndCatchErrorToastOptions)
				navigate('/')
			} else {
				const result = await response.json()
				toast.error(result, errorToastOptions)
			}
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<PageMetaData title="Reset Password" />
			<AuthLayout>
				<Card>
					<CardBody className={`p-0 ${styles.logoBg}`}>
						<div className="text-center p-3">
							<Link to="/" className="logo logo-admin">
								<img
									src={logoSm}
									height={50}
									alt="logo"
									className={`auth-logo ${styles.imageSizing}`}
								/>
							</Link>
							<h4 className="mt-2 mb-1 fw-semibold text-white font-18">
								Reset Password
							</h4>
							{!otpSent && (
								<p className={`mb-0 ${styles.fontClr}`}>
									Enter your Email to receive an OTP
								</p>
							)}
						</div>
					</CardBody>
					{!otpSent && (
						<CardBody className="pt-0">
							<div className="my-4">
								<Form.Group className="mb-3">
									<Form.Label>
									Email
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										value={email}
										onChange={(e) => {setEmail(e.target.value)}}
									/>
								</Form.Group>
								<Row className="form-group mb-0">
									<Col xs={12}>
										<Button 
											variant="primary" 
											className="w-100" 
											type="submit" 
											onClick={handleGenerateOtp}
											disabled={loading} 
										>
											Generate OTP <i className="fas fa-sign-in-alt ms-1" />
										</Button>
									</Col>
								</Row>
							</div>
						</CardBody>
					)}
					{otpSent && (
					<CardBody className="pt-4 mb-3">
						<b>Please enter the 6-digit code sent to your email.</b>
						<Form.Group className="my-2">
							<Form.Label>
								OTP
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter OTP"
								value={otp}
								onChange={(e) => {setOtp(e.target.value)}}
							/>
						</Form.Group>
						<div className="d-flex justify-content-end">
							<Link onClick={handleGenerateOtp} className="text-primary fs-6">
								Resend OTP
							</Link>
						</div>
						
						<Form.Group className="mb-2">
							<Form.Label>
								Password
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								value={password.newPassword}
								onChange={(e) => {setPassword({...password, newPassword: e.target.value})}}
							/>
						</Form.Group>
			
						<Form.Group className="mb-2">
							<Form.Label>
								Confirm Password
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter confirm password"
								value={password.confirmPassword}
								onChange={(e) => {setPassword({...password, confirmPassword: e.target.value})}}
							/>
						</Form.Group>
					
						<Row className="form-group mb-0">
							<Col xs={12}>
								<div className="d-grid mt-3">
									<Button 
										variant="primary" 
										type="submit" 
										disabled={loading} 
										onClick={handleOtpAndPassword}
									>
										Verify OTP & Save Password <i className="fas fa-sign-in-alt ms-1" />
									</Button>
								</div>
							</Col>
						</Row>
					</CardBody>
				    )} 
				</Card>
			</AuthLayout>
		</>
	)
}
export default ResetPassword
