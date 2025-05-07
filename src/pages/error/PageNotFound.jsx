import { Card, CardBody } from 'react-bootstrap'
import AuthLayout from '../auth/AuthLayout'
import { Link } from 'react-router-dom'
import { PageMetaData } from '@/components'
import errorSvg from '@/assets/images/error.svg'
import logoSm from '@/assets/images/cb.png'
import styles from '../structure/App.module.css'

const PageNotFound = () => {
	const user = JSON.parse(localStorage.getItem('user')) || ''
	return (
		<>
			<PageMetaData title="Page Not Found" />
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
								Oops! Sorry page does not found
							</h4>
							<p className={`mb-0 ${styles.fontClr}`}>Back to {['manager', 'admin'].includes(user.role) ? 'Dashboard of Time Sheet...' : 'Time Sheets...'} </p>
						</div>
					</CardBody>
					<CardBody>
						<div className="ex-page-content text-center">
							<img src={errorSvg} height={170} />
							<h1 className="mt-5 mb-4">404!</h1>
							<h5 className="font-16 text-muted mb-5">Somthing went wrong</h5>
						</div>
						<Link className="btn btn-primary w-100" to="/">
							Back to {['manager', 'admin'].includes(user.role) ? 'Dashboard' : 'Time Sheets'} <i className="fas fa-redo ml-1" />
						</Link>
					</CardBody>
					<CardBody className="bg-light-alt text-center">
						Copyright © {new Date().getFullYear()}. All Rights Reserved.
					</CardBody>
				</Card>
			</AuthLayout>
		</>
	)
}
export default PageNotFound

// import { Card, CardBody } from 'react-bootstrap'
// import AuthLayout from '../auth/AuthLayout'
// import { Link } from 'react-router-dom'
// import { PageMetaData } from '@/components'
// import errorSvg from '@/assets/images/error.svg'
// import logoSm from '@/assets/images/cb.png'
// import styles from '../structure/App.module.css'

// const PageNotFound = ({ statusCode = 404, userRole = '', allowedRoles = [] }) => {
//   const is403 = statusCode === 403
//   const user = JSON.parse(localStorage.getItem('user')) || ''
  
//   // Configure error display based on status code
//   const errorCode = is403 ? "403" : "404"
//   const errorTitle = is403 ? "Access Forbidden" : "Page Not Found"
//   const errorMessage = is403 
//     ? `You don't have permission to access this page${
//         allowedRoles.length > 0 ? `. Required role(s): ${allowedRoles.join(', ')}` : ''
//       }`
//     : "The page you are looking for does not exist"

//   // Determine redirect path based on user role
//   const redirectPath = ['manager', 'admin'].includes(userRole) 
//     ? '/dashboard/' 
//     : '/timesheets/user/'
  
//   return (
//     <>
//       <PageMetaData title={errorTitle} />
//       <AuthLayout>
//         <Card>
//           <CardBody className={`p-0 ${styles.logoBg}`}>
//             <div className="text-center p-3">
//               <Link to={redirectPath} className="logo logo-admin">
//                 <img
//                   src={logoSm}
//                   alt="logo"
//                   className={`auth-logo ${styles.imageSizing}`}
//                 />
//               </Link>
//               <h4 className="mt-2 mb-1 fw-semibold text-white font-18">
//                 Oops! {errorTitle}
//               </h4>
//               <p className={`mb-0 ${styles.fontClr}`}>
//                 Back to {['manager', 'admin'].includes(userRole) ? 'Dashboard of Time Sheet...' : 'Time Sheets...'}
//               </p>
//             </div>
//           </CardBody>
//           <CardBody>
//             <div className="ex-page-content text-center">
//               <img src={errorSvg} height={170} alt="Error" />
//               <h1 className="mt-5 mb-4">{errorCode}!</h1>
//               <h5 className="font-16 text-muted mb-5">{errorMessage}</h5>
//             </div>
//             <Link className="btn btn-primary w-100" to={redirectPath}>
//               Back to {['manager', 'admin'].includes(userRole) ? 'Dashboard' : 'Time Sheets'} <i className="fas fa-redo ms-1" />
//             </Link>
//           </CardBody>
//           <CardBody className="bg-light-alt text-center">
//             Copyright © {new Date().getFullYear()}. All Rights Reserved.
//           </CardBody>
//         </Card>
//       </AuthLayout>
//     </>
//   )
// }

// export default PageNotFound