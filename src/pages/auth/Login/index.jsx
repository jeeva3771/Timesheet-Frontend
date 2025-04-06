import { FormInputPassword, FormTextInput, PageMetaData } from '@/components'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import AuthLayout from '../AuthLayout'
import useLogin from './useLogin'
import logoSm from '@/assets/images/cb.png'
import styles from './App.module.css'
import { useForm } from 'react-hook-form'

const Login = () => {
	const { loading, control, login, redirectUrl, isAuthenticated } = useLogin()
	return (
		<>
			<PageMetaData title="Login" />
			{isAuthenticated && <Navigate to={redirectUrl} replace />}
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
					<CardBody className="pt-0">
						<form className="my-4" onSubmit={login}>
							<FormTextInput
								name="email"
								label="Email"
								containerClass="mb-2"
								value="jeeva37710@gmail.com"
								control={control}
								placeholder="Enter email"
							/>
							<FormInputPassword
								name="password"
								label="Password"
								value="123456@"
								control={control}
								placeholder="Enter password"
							/>
							<Row className="form-group mt-3">
								<Col sm="12" className="text-end">
									<Link to="/resetpassword/" className="text-muted font-13">
										<i className="dripicons-lock" /> Forgot password?
									</Link>
								</Col>
							</Row>
							<Row className="form-group mb-0">
								<Col xs={12}>
									<div className="d-grid mt-3">
										<Button variant="primary" disabled={loading} type="submit">
											Log In <i className="fas fa-sign-in-alt ms-1" />
										</Button>
									</div>
								</Col>
							</Row>
						</form>
					</CardBody>
				</Card>
			</AuthLayout>
		</>
	)
}
export default Login
