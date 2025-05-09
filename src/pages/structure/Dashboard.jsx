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
import { readUsersCount, readProjectsCount, readProjects} from './Api'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from "./utils/Toastoption"
import { updatedProjects } from './utils/util'
import styles from "./App.module.css"

const Project = () => {
	const navigate = useNavigate()
	const { removeUserLogged } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const [limit, setLimit] = useState(5)
	
	const [usersCount, setUsersCount] = useState({
	  totalManagers: 0,
	  activeManagers: 0,
	  totalEmployees: 0,
	  activeEmployees: 0
	})

	const [projectsCount, setProjectsCount] = useState({
		totalProjects: 0,
		completedProjects: 0
	})
	const [projects, setProjects] = useState([])
	
	useEffect(() => {
	  fetchAllCounts()
	}, [])

	useEffect(() => {
		fetchProjects()
	}, [limit])
	
	// Fetch all counts in parallel
	const fetchAllCounts = async () => {
	  
	  try {
		// Execute all requests in parallel
		await Promise.all([
		  fetchSingleCount(true, false),  // All managers
		  fetchSingleCount(true, true),   // Active managers
		  fetchSingleCount(false, false),  // All employees
		  fetchSingleCount(false, true),  // Active employees
		  handleReadProjectsCount(true),
		  handleReadProjectsCount(false),
		  fetchProjects()
		])
	  } catch (error) {
		toast.error('Something went wrong. Please try again later.', errorToastOptions)
	  }
	}
	
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
		  // Determine which state property to update based on parameters
		  let stateKey
		  if (isManager && isActive) stateKey = 'activeManagers'
		  else if (isManager && !isActive) stateKey = 'totalManagers'
		  else if (!isManager && isActive) stateKey = 'activeEmployees'
		  else stateKey = 'totalEmployees'
		  
		  // Update only the specific count in the state
		  setUsersCount(prevState => ({
			...prevState,
			[stateKey]: result.totalCount || 0
		  }))
		} else {
		  const errorData = await response.json()
		  toast.error(errorData, errorToastOptions)
		}
	  } catch (error) {
		toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
	  }
	}

	const handleReadProjectsCount = async (isCompleted = false) => {
		try {
		  const { response, error } = await readProjectsCount(isCompleted)
		  
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
			// Determine which state property to update based on parameters
			let stateKey
			if (isCompleted) stateKey = 'completedProjects'
			else stateKey = 'totalProjects'
			
			// Update only the specific count in the state
			setProjectsCount(prevState => ({
			  ...prevState,
			  [stateKey]: result.totalProjectCount || 0
			}))
		  } else {
			const errorData = await response.json()
			toast.error(errorData, errorToastOptions)
		  }
		} catch (error) {
		  toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		}
	}

	const fetchProjects = async (pageNo, sortColumn, sortOrder, searchText) => {
		try {
		  setLoading(true)
		  const { response, error } = await readProjects(limit, pageNo, sortColumn, sortOrder, searchText || '')
	
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
	
		  const { projects } = await response.json()
		  const updatedData = updatedProjects(projects)
		  setProjects(updatedData)
	
		} catch (error) {
			console.log(error)
		  toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		} finally {
		  setLoading(false)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Dashboard" />
			<Row className="justify-content-center">
				<Col md={6} lg={4}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Manager(s)</p>
									<h4 className="my-1">
										{usersCount.totalManagers ? (
											usersCount.totalManagers
										) : (
											<span class="spinner-border spinner-border-sm text-secondary"></span>
										)}
									</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										{usersCount.activeManagers ? (
											usersCount.activeManagers
										) : (
											<span class='spinner-border spinner-border-sm text-secondary' style={{ width: '0.8rem', height: '0.8rem' }}></span>
										)} Active Member(s)
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
				<Col md={6} lg={4}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Employee(s)</p>
									<h4 className="my-1">
										{usersCount.totalEmployees ? (
											usersCount.totalEmployees
										) : (
											<span class="spinner-border spinner-border-sm text-secondary"></span>
										)}
									</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										{usersCount.activeEmployees ? (
											usersCount.activeEmployees
										) : (
											<span class="spinner-border spinner-border-sm text-secondary" style={{ width: '0.8rem', height: '0.8rem' }}></span>
										)} Active Member(s)
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
				<Col md={6} lg={4}>
					<Card className="report-card">
						<CardBody>
							<Row className="d-flex justify-content-center">
								<Col>
									<p className="text-dark mb-1 fw-semibold">Project(s)</p>
									<h4 className="my-1">
										{projectsCount.totalProjects ? (
											projectsCount.totalProjects
										) : (
											<span class="spinner-border spinner-border-sm text-secondary"></span>
										)}
									</h4>
									<p className="mb-0 text-truncate text-muted">
										<span className="text-success">
											<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
										</span>
										<span className="text-muted">
											{projectsCount.completedProjects ? (
												projectsCount.completedProjects
											) : (
												<span class="spinner-border spinner-border-sm text-secondary" style={{ width: '0.8rem', height: '0.8rem' }}></span>
											)} Project(s) Completed
										</span>
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
				{/* <Col md={6} lg={3}>
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
				</Col> */}
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
									<button className="text-primary btn p-0 border-0 bg-transparent" onClick={() => setLimit(limit === 5 ? -1 : 5)}>
										{limit === 5 ? 'View All' : 'Show Less'}
									</button>
								</Col>
							</Row>
						</CardHeader>
						<CardBody>
							<div className="table-responsive">
								<table className="table table-hover mb-0 table-striped">
									<thead>
										<tr>
											<th>Project Name</th>
											<th>Client Name</th>
											<th>Start Date</th>
											<th>Deadline</th>
											<th>Status</th> 
											{/* <th>Progress</th> */}
										</tr>
									</thead>
									<tbody>
									{loading ? (
										<tr><td colSpan="9" className="text-center">Loading...</td></tr>
									) : projects.length > 0 ? (
									    projects.map((project, idx) => (
												<tr key={idx}>
													<td>{project.projectName}</td>
													<td>{project.clientName}</td>
													<td>{project.projectStart}</td>
													<td>{project.projectEnd}</td>
													<td>
														<span
															className={clsx(
																'badge badge-md badge-boxed',
																project.status === 'active'
																? 'badge-soft-success'
																: project.status === 'completed'
																? 'badge-soft-danger'
																: project.status === 'pending'
																? 'badge-soft-warning'
																: 'badge-soft-secondary' // for 'notStarted' or anything else
															)}
														>
 															{
															project.status === 'active'
																? 'Active'
																: project.status === 'completed'
																? 'Completed'
																: project.status === 'pending'
																? 'Pending'
																: project.status === 'notStarted'
																? 'Not Started'
																: project.status
															}														
															</span>
													</td>
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
												</tr>
												 ))
												) : (
												  <tr><td colSpan="9" className="text-center small">No results found.</td></tr>
												)}
										
									</tbody>
								</table>
							</div>
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