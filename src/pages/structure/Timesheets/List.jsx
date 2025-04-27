import React, { useState, useEffect } from 'react'
import { PageBreadcrumb } from '@/components'
import styles from '../App.module.css'
import { useAuthContext } from '@/context'
import clsx from 'clsx'
import { readTimesheets, readUserNameAndRole, readProjectName } from '../Api.js'
import { toast } from 'sonner'
import { Button, Card, CardBody, Col, Modal, Row } from 'react-bootstrap'
import {
	successAndCatchErrorToastOptions,
	errorToastOptions,
} from '../utils.js/Toastoption.js'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { capitalizeFirst } from '../utils.js/util.js'
const apiUrl = import.meta.env.VITE_API_URL

const ReadTimeSheetList = () => {
	const { removeUserLogged } = useAuthContext()
	const navigate = useNavigate()
	const [timesheets, setTimesheets] = useState([])
	const [timeSheetCount, setTimeSheetCount] = useState(0)
	const [totalHoursWorked, setTotalHoursWorked] = useState('')
	const [loading, setLoading] = useState(false)
	const [selectedProject, setSelectedProject] = useState('')
	const [projectList, setProjectList] = useState([])
	const [selectedPerson, setSelectedPerson] = useState('')
	const [userList, setUserList] = useState([])
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [reportImage, setReportImages] = useState({})
	const [pageSize, setPageSize] = useState(10)
	const [pageIndex, setPageIndex] = useState(0)
	const [limit, setLimit] = useState(10)
	const [pageNo, setPageNo] = useState(1)
	const totalPages = pageSize === -1 ? 1 : Math.ceil(timeSheetCount / pageSize)
	const [sortColumn, setSortColumn] = useState('t.createdAt')
	const [sortOrder, setSortOrder] = useState('DESC')
	const [selectedImageId, setSelectedImageId] = useState(null)

	const defaultColumn = [
		{ key: 'ur.name', label: 'Name' },
		{ key: 'p.projectName', label: 'Project' },
		{ key: 't.workDate', label: 'Date' },
		{ key: 't.task', label: 'Task' },
		{ key: 't.hoursWorked', label: 'Hour(s) Worked' },
	]
  
	useEffect(() => {
		handleReadUserNameAndRole(false, '', false)
    	handleReadProjectName(true, true, false, undefined, false)
	}, [])

	useEffect(() => {
		handleReadUserNameAndRole(false, selectedProject, false)
		setPageIndex(0)
		setPageNo(1)
	}, [selectedProject])

	useEffect(() => {
		handleReadProjectName(true, true, false, selectedPerson, false)
		setPageIndex(0)
		setPageNo(1)
	}, [selectedPerson])

	useEffect(() => {
		setPageIndex(0)
		setPageNo(1)
	}, [startDate, endDate])

	useEffect(() => {
		setPageNo(pageIndex + 1)
	}, [pageIndex])

	useEffect(() => {
		const currentLimit = pageSize === -1 ? timeSheetCount : pageSize
		setLimit(currentLimit)
	}, [pageSize, timeSheetCount])

	useEffect(() => {
		fetchTimesheet()
	}, [
		pageNo,
		limit,
		sortColumn,
		sortOrder,
		selectedPerson,
		selectedProject,
		startDate,
		endDate,
	])

	const handleSort = (column) => {
		const newSortOrder =
			sortColumn === column && sortOrder === 'ASC' ? 'DESC' : 'ASC'
		setSortColumn(column)
		setSortOrder(newSortOrder)
		setPageIndex(0)
		setPageNo(1)
	}

	const fetchTimesheet = async () => {
		try {
			setLoading(true)
			const { response, error } = await readTimesheets(
				limit,
				pageNo,
				sortColumn,
				sortOrder,
				startDate,
				endDate,
				selectedPerson,
				selectedProject
			)

			if (error) {
				toast.error(error, successAndCatchErrorToastOptions)
				return
			}

			if (response.status === 401) {
				removeUserLogged()
				navigate('/')
				return
			}

			const { timesheets, totalTimesheetCount, totalAdjustedHoursWorked } = await response.json()
			const updatedData = reportUpdateData(timesheets)

			setTimesheets(updatedData)
			setTotalHoursWorked(totalAdjustedHoursWorked)
			setTimeSheetCount(totalTimesheetCount || 0)

			const docImage = {}
			timesheets.forEach((timesheet) => {
				docImage[timesheet.timesheetId] =
					`${apiUrl}/api/timesheets/documentimage/${timesheet.timesheetId}/?t=${Date.now()}`
			})
			setReportImages(docImage)
		} catch (error) {
			toast.error(
				'Something went wrong. Please try again later.',
				successAndCatchErrorToastOptions
			)
		} finally {
			setLoading(false)
		}
	}

	const handleReadUserNameAndRole = async (adminAndEmployee = false, selectedProject, deleted = false) => {
		try {
			const { response, error } = await readUserNameAndRole(adminAndEmployee, selectedProject, deleted)
			if (error) {
				toast.error(error, errorToastOptions)
				return
			}

			if (response.status === 401) {
				removeUserLogged()
				navigate('/')
				return
			}

			if (response.ok) {
				const userInfo = await response.json()
				setUserList(userInfo)
			}
		} catch (error) {
			toast.error(
				'Something went wrong. Please try again later.',
				successAndCatchErrorToastOptions
			)
		}
	}

	const handleReadProjectName = async (hr = false, employee = false, inProgress = false, userId, deleted = false) => {
		try {
			const { response, error } = await readProjectName(hr, employee, inProgress, userId, deleted)

			if (error) {
				toast.error(error, errorToastOptions)
				return
			}

			if (response.status === 401) {
				removeUserLogged()
				navigate('/')
				return
			}

			if (response.ok) {
				const projectInfo = await response.json()
				setProjectList(projectInfo)
			}
		} catch (error) {
			toast.error(
				'Something went wrong. Please try again later.',
				successAndCatchErrorToastOptions
			)
		}
	}

	const reportUpdateData = (timesheets) => {
		const defaultValue = ['hoursWorked', 'workedDate']

		return (timesheets || []).map((timesheet) => {
			const updatedUser = {}

			for (let key in timesheet) {
				if (defaultValue.includes(key)) {
					updatedUser[key] = timesheet[key]
				} else if (typeof timesheet[key] === 'string') {
					updatedUser[key] =
						timesheet[key].charAt(0).toUpperCase() +
						timesheet[key].slice(1).toLowerCase()
				} else {
					updatedUser[key] = timesheet[key]
				}
			}

			return updatedUser
		})
	}  

	const handleViewDocument = (timesheetId, url) => {
		setSelectedImageId(timesheetId)
		setReportImages((prev) => ({ ...prev, [timesheetId]: url }))
		setShowModal(true)
	}

	return (
		<>
			<PageBreadcrumb title="Time Sheets List" />
			<Row>
				<Col xs="12">
					<Card>
						<CardBody>
							<Row className="mb-3">
								<Col md={3}>
									<Form.Group>
										<Form.Label>Select Person</Form.Label>
										<Form.Select
											value={selectedPerson}
											onChange={(e) => setSelectedPerson(e.target.value)}>
											<option value="">All</option>
											{userList
												.sort((a, b) => {
													if (
														a.role.toLowerCase() === 'employee' &&
														b.role.toLowerCase() === 'hr'
													)
														return -1
													if (
														a.role.toLowerCase() === 'hr' &&
														b.role.toLowerCase() === 'employee'
													)
														return 1
													return 0
												})
												.map((emp) => (
													<option key={emp.userId} value={emp.userId}>
														{capitalizeFirst(emp.name)} - (
														{emp.role === 'hr' ? 'HR' : capitalizeFirst(emp.role)})
													</option>
												))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={3}>
									<Form.Group>
										<Form.Label>Select Project</Form.Label>
										<Form.Select
											value={selectedProject}
											onChange={(e) => setSelectedProject(e.target.value)}>
											<option value="">All</option>
											{projectList.map((project) => {
												const cleanedProjectName = project.projectName
												.replace(/\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, '') // remove date part
												.replace(/-\s*$/, '') // remove last hyphen (with optional space)
												.trim() // clean up trailing spaces

												// Check if the name is in the deleted format
												const isDeleted = /\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(project.projectName)
												const projectNameWithStatus = isDeleted ? `${cleanedProjectName} (deleted)` : cleanedProjectName

												return (
												<option key={project.projectId} value={project.projectId} >
													{projectNameWithStatus.replace(/\b(deleted)\b/i, 'Deleted').replace(/^./, str => str.toUpperCase())}
												</option>
												)
											})}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={2}>
									<Form.Group>
										<Form.Label>Start Date</Form.Label>
										<Form.Control
											type="date"
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={2}>
									<Form.Group>
										<Form.Label>End Date</Form.Label>
										<Form.Control
											type="date"
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={2} className="d-flex align-items-end">
									<Button
										variant="danger"
										onClick={() => {
											setSelectedPerson('')
											setSelectedProject('')
											setStartDate('')
											setEndDate('')
											setPageIndex(0)
											setPageNo(1)
										}}>
										Reset
									</Button>
								</Col>
							</Row>
							<div className="table-responsive mt-3">
								<table className={clsx('table table-centered react-table')}>
									<thead>
										<tr>
											<th>S. No.</th>
											{defaultColumn.map(({ key, label }) => (
												<th
													key={key}
													onClick={() => handleSort(key)}
													className={styles.cursorPointer}>
													{label}
												</th>
											))}
											<th>Documents</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td colSpan="8" className="text-center">
													Loading...
												</td>
											</tr>
										) : timesheets.length > 0 ? (
											timesheets.map((timesheet, index) => (
												<tr key={index}>
													<td>{(pageNo - 1) * limit + index + 1}</td>
													<td>{timesheet.name}</td>
													<td>
														{timesheet.projectName
														.replace(/\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, '') // remove date part
														.replace(/-\s*$/, '') // remove last hyphen (with optional space)
														.trim() // clean up trailing space if any
														}
													</td>
													<td>{timesheet.workedDate}</td>
													<td>{timesheet.task}</td>
													<td>
														{(() => {
															const hours = parseFloat(timesheet.hoursWorked)
															const whole = Math.floor(hours)
															const decimal = +(hours - whole).toFixed(2) // Important: keep 2 decimal places

															let displayHours

															if (decimal === 0.5) {
																displayHours = whole + 0.3  // .50 becomes .30
															} else {
																displayHours = hours
															}

															return Number.isInteger(displayHours) ? parseInt(displayHours) : displayHours.toFixed(2)
														})()}
													</td>
													<td>
														{reportImage[timesheet.timesheetId] ? (
															<Button
																variant="link"
																className="text-primary"
																style={{ textDecoration: 'none' }}
																onClick={() =>
																	handleViewDocument(
																		timesheet.timesheetId,
																		reportImage[timesheet.timesheetId]
																	)
																}>
																View
															</Button>
														) : (
															<span>No Document</span>
														)}
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan="8" className="text-center small">
													No results found.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="d-lg-flex align-items-center text-center pb-1 mt-3">
								{/* Page size dropdown */}
								<div className="d-inline-block me-3">
									<label className="me-1">Display :</label>
									<select
										value={pageSize}
										onChange={(e) => {
											const newSize =
												e.target.value === '-1' ? -1 : Number(e.target.value)
											setPageSize(newSize)
											setPageIndex(0)
										}}
										className="form-select d-inline-block w-auto">
										{[10, 20, 50, 'All'].map((size) => (
											<option key={size} value={size === 'All' ? -1 : size}>
												{size}
											</option>
										))}
									</select>
								</div>

								{/* Page Info */}
								<span className="me-3">
									Page{' '}
									<strong>
										{pageIndex + 1} of {totalPages}
									</strong>
								</span>

								{/* Go to page input */}
								<div className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
									<label className="me-1">Go to page:</label>
									<input
										type="number"
										value={pageIndex + 1}
										min={1}
										max={totalPages}
										onChange={(e) => {
											const value = e.target.value
											const num = Number(value)
											if (!isNaN(num) && num >= 1 && num <= totalPages) {
												setPageIndex(num - 1)
											}
										}}
										className="form-control d-inline-block"
										style={{ width: '80px' }}
									/>
								</div>
								{(selectedPerson || selectedProject) && (
									<div className="ps-3">
										<label className="me-1">Hour(s) Worked :</label>
										<input
											type="text"
											className="btn btn-primary px-1"
											value={parseFloat(totalHoursWorked) % 1 === 0
												? parseInt(totalHoursWorked)
												: totalHoursWorked}
											readOnly
										/>
									</div>
                                )}

								<ul className="pagination pagination-rounded d-inline-flex ms-auto align-items-center mb-0">
									{/* Previous Button */}
									<li
										className={clsx('page-item', { disabled: pageIndex === 0 })}
										onClick={() =>
											pageIndex > 0 && setPageIndex(pageIndex - 1)
										}>
										<a
											className="page-link"
											href="#"
											onClick={(e) => e.preventDefault()}>
											<svg
												stroke="currentColor"
												fill="none"
												strokeWidth="2"
												viewBox="0 0 24 24"
												strokeLinecap="round"
												strokeLinejoin="round"
												height="1em"
												width="1em"
												xmlns="http://www.w3.org/2000/svg">
												<polyline points="15 18 9 12 15 6" />
											</svg>
										</a>
									</li>

									{/* Dynamic page numbers */}
									{Array.from({ length: 3 }, (_, i) => {
										const offset = i - 1
										const pageNumber = pageIndex + offset
										if (pageNumber < 0 || pageNumber >= totalPages) return null

										return (
											<li
												key={pageNumber}
												className={clsx('page-item', {
													active: pageIndex === pageNumber,
												})}
												onClick={() => setPageIndex(pageNumber)}>
												<a
													className="page-link"
													href="#"
													onClick={(e) => e.preventDefault()}>
													{pageNumber + 1}
												</a>
											</li>
										)
									})}

									{/* Next Button */}
									<li
										className={clsx('page-item', {
											disabled: pageIndex === totalPages - 1,
										})}
										onClick={() =>
											pageIndex < totalPages - 1 && setPageIndex(pageIndex + 1)
										}>
										<a
											className="page-link"
											href="#"
											onClick={(e) => e.preventDefault()}>
											<svg
												stroke="currentColor"
												fill="none"
												strokeWidth="2"
												viewBox="0 0 24 24"
												strokeLinecap="round"
												strokeLinejoin="round"
												height="1em"
												width="1em"
												xmlns="http://www.w3.org/2000/svg">
												<polyline points="9 18 15 12 9 6" />
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
				<Modal.Header closeButton>
					<Modal.Title>Document View</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					{selectedImageId && reportImage[selectedImageId] ? (
						(() => {
							const fileUrl = reportImage[selectedImageId]
							const fileExtension = fileUrl.split('.').pop().toLowerCase()
							const isDocument = ['pdf', 'xls', 'xlsx', 'csv'].includes(
								fileExtension
							)
							return isDocument ? (
								<>
									<iframe
										src={fileUrl}
										title="Document Viewer"
										className={`${styles.viewPort} ${styles.heightAuto}`}
									/>
								</>
							) : (
								<>
									<img
										src={fileUrl}
										alt="Document"
										className={`${styles.viewPort} ${styles.heightAuto}`}
									/>
								</>
							)
						})()
					) : (
						<p>No document available.</p>
					)}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default ReadTimeSheetList


