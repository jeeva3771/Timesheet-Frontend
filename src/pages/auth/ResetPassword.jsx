import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormInputPassword, FormTextInput, PageMetaData } from '@/components'
import logoSm from '@/assets/images/logo-sm.png'
import { useState } from 'react'


const ResetPassword = () => {
	const [otpSent, setOtpSent] = useState(false)
	const navigate = useNavigate()
	const schemaResolver = yup.object().shape({
		email: yup
			.string()
			.required('Please enter Email')
			.email('Please enter valid Email'),
	})
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(schemaResolver),
	})

	const handleGenerateOtp = (data) => {
		setOtpSent(true)
	}

	const handleOtpAndPassword = () => {
		navigate('/auth/login/')
	}
	return (
		<>
			<PageMetaData title="Reset Password" />
			<AuthLayout>
				<Card>
					<CardBody className="p-0 auth-header-box">
						<div className="text-center p-3">
							<Link to="/" className="logo logo-admin">
								<img
									src={logoSm}
									height={50}
									alt="logo"
									className="auth-logo"
								/>
							</Link>
							<h4 className="mt-3 mb-1 fw-semibold text-white font-18">
								Reset Password
							</h4>
							<p className="text-muted  mb-0">
								Enter your Email to receive an OTP!
							</p>
						</div>
					</CardBody>
					{!otpSent && (
					<CardBody className="pt-0">
						<form className="my-4" onSubmit={handleSubmit(() => {})}>
							<FormTextInput
								name="email"
								label="Email"
								type="email"
								placeholder="Enter Email Address"
								containerClass="mb-3"
								control={control}
							/>
							<Row className="form-group mb-0">
								<Col xs={12}>
									<Button variant="primary" className="w-100" type="submit" onClick={handleGenerateOtp}>
										Generate OTP <i className="fas fa-sign-in-alt ms-1" />
									</Button>
								</Col>
							</Row>
						</form>
					</CardBody>
					)}
					{otpSent && (
					<CardBody className="pt-4 mb-3">
						<b>Please enter the 6-digit code sent to your email.</b>
						<FormTextInput
							name="otp"
							label="OTP"
							containerClass="my-2"
							control={control}
							placeholder="Enter OTP"
						/>
						<div className="d-flex justify-content-end">
								<Link to="#" className="text-muted fs-6">
									Resend OTP
								</Link>
							</div>
						<FormInputPassword
							name="password"
							label="Password"
							control={control}
							containerClass="mb-2"
							placeholder="Enter password"
						/>
						<FormInputPassword
							name="confirmPassword"
							label="Confirm Password"
							control={control}
							containerClass="mb-2"
							placeholder="Enter confirm password"
						/>
					
						<Row className="form-group mb-0">
							<Col xs={12}>
								<div className="d-grid mt-3">
									<Button variant="primary" type="submit" onClick={handleOtpAndPassword}>
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
