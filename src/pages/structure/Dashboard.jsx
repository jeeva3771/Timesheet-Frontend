import { PageBreadcrumb } from '@/components'
import { FiLayers, FiUsers, FiUserPlus } from 'react-icons/fi'
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Row,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { readUsersCount } from './Api'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context'


const Project = () => {
	const navigate = useNavigate()
	const { removeUserLogged } = useAuthContext()
	
	const [usersCount, setUsersCount] = useState({
	  totalManager: 0,
	  activeManager: 0,
	  totalEmployee: 0,
	  activeEmployee: 0
	})
	
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
	  fetchAllCounts()
	}, [])
	
	// Fetch all counts in parallel
	const fetchAllCounts = async () => {
	  setLoading(true)
	  
	  try {
		// Execute all requests in parallel
		await Promise.all([
		  fetchSingleCount(true, true),   // Active managers
		  fetchSingleCount(true, false),  // All managers
		  fetchSingleCount(false, true),  // Active employees
		  fetchSingleCount(false, false)  // All employees
		])
	  } catch (error) {
		toast.error('Error fetching user counts', errorToastOptions)
	  } finally {
		setLoading(false)
	  }
	};
	
	// Function to fetch a single count type and update the state
	const fetchSingleCount = async (isManager, isActive) => {
	  try {
		const { response, error } = await readUsersCount(isManager, isActive)
		
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
		  const result = await response.json()
		  console.log(result)
		  
		  // Determine which state property to update based on parameters
		  let stateKey
		  if (isManager && isActive) stateKey = 'totalManager'
		  else if (isManager && !isActive) stateKey = 'activeManager'
		  else if (!isManager && isActive) stateKey = 'activeEmployee'
		  else stateKey = 'totalEmployee'
		  
		  // Update only the specific count in the state
		  setUsersCount(prevState => ({
			...prevState,
			[stateKey]: result.totalCount || 0
		  }))
		  console.log(usersCount)
		} else {
		  const errorData = await response.json()
		  toast.error(errorData, errorToastOptions)
		}
	  } catch (error) {
		toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
	  }
	}
	return (
		<>
			<PageBreadcrumb title="Dashboard" />
			<Row className="justify-content-center">
				<Col md={6} lg={3}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Manager(s)</p>
									<h4 className="my-1">2</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										2 Member(s)
									</p>
								</Col>
								<Col xs="auto" className="align-self-center">
									<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
										<FiUserPlus className="align-self-center text-muted icon-sm" />
									</div>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md={6} lg={3}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Employee(s)</p>
									<h4 className="my-1">9</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										9 Member(s)
									</p>
								</Col>
								<Col xs="auto" className="align-self-center">
									<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
										<FiUsers className="align-self-center text-muted icon-sm" />
									</div>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md={6} lg={3}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Project(s)</p>
									<h4 className="my-1">40</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										<span className="text-muted">26 Project Complete</span>
									</p>
								</Col>
								<Col xs="auto" className="align-self-center">
									<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
										<FiLayers className="align-self-center text-muted icon-sm" />
									</div>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md={6} lg={3}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Client(s)</p>
									<h4 className="my-1">7</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										<span className="text-muted">7 Member(s)</span>
									</p>
								</Col>
								<Col xs="auto" className="align-self-center">
									<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
										<FiUsers className="align-self-center text-muted icon-sm" />
									</div>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col lg={12}>
					<Card>
						<CardHeader>
							<Row className="align-items-center">
								<Col>
									<CardTitle as="h4">All Projects</CardTitle>
								</Col>
								<Col xs="auto">
									<Link to="" className="text-primary">
										View All
									</Link>
								</Col>
							</Row>
						</CardHeader>
						<CardBody>
							<div className="table-responsive"></div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default Project
{/* <table className="table table-hover mb-0">
						<thead className="thead-light">
							<tr>
								<th>Project Name</th>
								<th>Client Name</th>
								<th>Start Date</th>
								<th>Deadline</th>
								<th>Status</th> */}
								{/* <th>Progress</th> */}
						// 	</tr>
						// </thead>
						// <tbody>
						// 	{allProjects.map((project, idx) => {
						// 		return (
						// 			<tr key={idx}>
						// 				<td>{project.name}</td>
						// 				<td>
						// 					{project.client.name}
						// 				</td>
						// 				<td>{project.startDate}</td>
						// 				<td>{project.deadLine}</td>
						// 				<td>
						// 					<span
						// 						className={clsx(
						// 							'badge badge-md badge-boxed',
						// 							project.status == 'Pending'
						// 								? 'badge-soft-warning'
						// 								: project.status == 'Complete'
						// 									? 'badge-soft-danger'
						// 									: 'badge-soft-success'
						// 						)}
						// 					>
						// 						{project.status}
						// 					</span>
						// 				</td>
										{/* <td>
											<small className="float-end ms-2 pt-1 font-10">
												{project.progress}%
											</small>
											<ProgressBar
												variant={
													project.status == 'Complete'
														? 'danger'
														: project.status == 'Pending'
															? 'warning'
															: 'success'
												}
												now={project.progress}
												className="mt-2"
												style={{
													height: 3,
												}}
											/>
										</td> */}
					// 				</tr>
					// 			)
					// 		})}
					// 	</tbody>
					// </table>