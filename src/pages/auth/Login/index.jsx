import { FormInputPassword, FormTextInput, PageMetaData } from '@/components'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import AuthLayout from '../AuthLayout'
import useLogin from './useLogin'
import logoSm from '@/assets/images/logo-sm.png'
const Login = () => {
	const { loading, control, login, redirectUrl, isAuthenticated } = useLogin()
	return (
		<>
			<PageMetaData title="Login" />
			{isAuthenticated && <Navigate to={redirectUrl} replace />}
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
								Let's Get Started Time Sheet
							</h4>
							<p className="text-muted  mb-0">
								Sign in to continue as Admin or Manager
							</p>
						</div>
					</CardBody>
					<CardBody className="pt-0">
						<form className="my-4" onSubmit={login}>
							<FormTextInput
								name="email"
								label="Email"
								containerClass="mb-2"
								control={control}
								placeholder="Enter email"
							/>
							<FormInputPassword
								name="password"
								label="Password"
								control={control}
								placeholder="Enter password"
							/>
							<Row className="form-group mt-3">
								<Col sm="12" className="text-end">
									<Link to="/auth/re-password" className="text-muted font-13">
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
						<div className="m-2 text-center text-muted">
							<Link to="/auth/register" className="text-primary ms-2">
								Employee login?
							</Link>
						</div>
					</CardBody>
				</Card>
			</AuthLayout>
		</>
	)
}
export default Login
