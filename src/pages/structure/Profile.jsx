import { PageBreadcrumb } from '@/components'
import {
	Card,
	CardBody,
	Col,
	Row,
	TabContainer,
	TabContent,
	TabPane,
	InputGroup,
	FormControl,
	FormGroup,
	FormLabel,
	Button,
	Form
} from 'react-bootstrap'
import user4 from '@/assets/images/users/user-4.jpg'
import { Link } from 'react-router-dom'
import { ComponentContainerCard } from '@/components'
import { updateUserProfileInfo, readUserMainDetailsById, changePassword } from './Api'
import { useState, useEffect } from 'react'
import { capitalizeFirst, capitalizeWords, formatDateToInput } from './utils/util'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from './utils/Toastoption'

const Profile = () => {
	let user = JSON.parse(localStorage.getItem("user")) || {}		  
	const [userData, setUserData] = useState({
		name: '',
		dob: '',
		emailId: ''
	})
	const [password, setPassword] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})
	const [loading, setLoading] = useState(false)
	const [loadingChangePwd, setLoadingChangePwd] = useState(false)

	useEffect(() => {
		handleReadUserMainDetailsById()
	}, [])

	const handleUserEditSubmit = async () => {
        setLoading(true)

        try {
            const { response, error } = await updateUserProfileInfo(userData)
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

            if (response.status === 200) {
				if (user) {
					user.name = userData.name
					user.birth = userData.dob
					user.emailId = userData.emailId
				
					localStorage.setItem("user", JSON.stringify(user))
				}
                const result = await response.json()
                toast.success(result, successAndCatchErrorToastOptions)
				
            } else {
                const responseData = await response.json()
                if (Array.isArray(responseData)) {
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
			console.log(error)
            toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
        } finally {
            setLoading(false)
        }
    }

	 const handleReadUserMainDetailsById = async () => {
		try {
		  const { response, error } = await readUserMainDetailsById()
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
	
		  if (response.ok) {
			const userDetails = await response.json()
		  
			setUserData({
			  name: userDetails.name,
			  dob: formatDateToInput(userDetails.dob),
			  emailId: userDetails.emailId
			})
		
		  } else {
			toast.error(await response.json(), errorToastOptions)
		  }
		} catch (error) {
		  toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		}
	}

	const handleUserEditPasswordSubmit = async () => {
        setLoadingChangePwd(true)
		const payload = {
			newPassword: password.newPassword,
			oldPassword: password.currentPassword,
			confirmPassword: password.confirmPassword
		}

        try {
            const { response, error } = await changePassword(payload)
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

            if (response.status === 200) {
                const result = await response.json()
                toast.success(result, successAndCatchErrorToastOptions)
            } else {
				const responseData = await response.json()
                if (Array.isArray(responseData)) {
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
            setLoadingChangePwd(false)
        }
    }

	return (
		<>
			<PageBreadcrumb title="Profile" />
			<Row>
				<Col xs={12}>
					<Card>
						<CardBody>
							<div className="met-profile">
								<Row>
									<Col lg={4} className="align-self-center mb-3 mb-lg-0">
										<div className="met-profile-main">
											<div className="met-profile-main-pic">
												<img
													src={user4}
													height={110}
													className="rounded-circle"
												/>
												<span className="met-profile_main-pic-change">
													<i className="fas fa-camera" />
												</span>
											</div>
											<div className="met-profile_user-detail">
												<h5 className="met-user-name">{user.name ? capitalizeWords(user.name) : 'User'}</h5>
												<p className="mb-0 met-user-name-post">
													{capitalizeFirst(user.role)}
												</p>
												<b> Email </b> : {user.emailId}
											</div>
										</div>
									</Col>
								</Row>
							</div>
						</CardBody>
						<CardBody className="p-0">
							<TabContainer defaultActiveKey="3">
								<TabContent>
									<TabPane
										eventKey="3"
										className="p-3"
										id="Settings"
										role="tabpanel">
										<Row>
											<Col lg={6} xl={6}>
												<ComponentContainerCard title="Personal Information">
													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															Name
														</FormLabel>
														<Col lg={9} xl={8}>
															<FormControl 
																type="text" 
																value={userData.name} 
																onChange={(e) => setUserData({ ...userData, name: e.target.value })}
															/>
														</Col>
													</FormGroup>
													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															DOB
														</FormLabel>
														<Col lg={9} xl={8}>
															<FormControl 
																type="date" 
																value={userData.dob} 
																onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
															/>
														</Col>
													</FormGroup>

													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															Email Address
														</FormLabel>
														<Col lg={9} xl={8}>
															<InputGroup>
																<span className="input-group-text">
																	<i className="las la-at" />
																</span>
															
																<FormControl
																	type="text"
																	value={userData.emailId}
																	onChange={(e) => setUserData({ ...userData, emailId: e.target.value })}
																	placeholder="Email"
																	aria-describedby="basic-addon1"
																/>
															</InputGroup>
														</Col>
													</FormGroup>

													<FormGroup className="mb-3 row">
														<Col lg={9} xl={8} className="offset-lg-3">
															<div className="d-inline-flex gap-1 align-items-center">
																<Button 
																	variant="de-primary" 
																	type="submit"
																	disabled={loading}
																	onClick={handleUserEditSubmit}
																>
																	Submit
																</Button>
															</div>
														</Col>
													</FormGroup>
												</ComponentContainerCard>
											</Col>
											<Col lg={6} xl={6}>
												<ComponentContainerCard title="Change Password">
													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															Current Password
														</FormLabel>
														<Col lg={9} xl={8}>
															<FormControl
																type="password"
																placeholder="Password"
																value={password.currentPassword}
																onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
															/>
															<Link
																to="/resetpassword/"
																className="text-primary font-12">
																Forgot password ?
															</Link>
														</Col>
													</FormGroup>
													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															New Password
														</FormLabel>
														<Col lg={9} xl={8}>
															<FormControl
																type="password"
																placeholder="New Password"
																value={password.newPassword}
																onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}

															/>
														</Col>
													</FormGroup>
													<FormGroup className="mb-3 row">
														<FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">
															Confirm Password
														</FormLabel>
														<Col lg={9} xl={8}>
															<FormControl
																type="password"
																placeholder="Re-Password"
																value={password.confirmPassword}
																onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
															/>
														</Col>
													</FormGroup>
													<FormGroup className="mb-3 row">
														<Col lg={9} xl={8} className="offset-lg-3">
															<Button
																variant="de-primary"
																type="submit"
																className="me-1"
																onClick={handleUserEditPasswordSubmit}
																disabled={loadingChangePwd}
															>
																Change Password
															</Button>
														</Col>
													</FormGroup>
												</ComponentContainerCard>
											</Col>
										</Row>
									</TabPane>
								</TabContent>
							</TabContainer>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default Profile
