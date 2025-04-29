// import { useEffect, useState } from "react"
// import { PageBreadcrumb } from '@/components'
// import { Row, Col, Card, CardBody, Button, Form } from "react-bootstrap"
// import { readProjectName, saveTimeSheet } from './Api'
// import { capitalizeFirst } from "./utils.js/util"
// import { toast } from "sonner"
// import { errorToastOptions, successAndCatchErrorToastOptions} from "./utils.js/Toastoption"
// import { useNavigate } from "react-router-dom"

// const Timesheet = () => {
// 	const [fields, setFields] = useState([])
// 	const [projectList, setProjectList] = useState([])
// 	const user = JSON.parse(localStorage.getItem('user')) || ''
// 	const [loading, setLoading] = useState(false)
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		handleReadProjectName(false, false, true, user.userId, true)
// 	}, [])

// 	const handleAdd = () => {
// 		setFields([...fields, {
// 			id: Date.now(),
// 			projectId: '',
// 			task: '',
// 			hoursWorked: '',
// 			userId: user?.userId,
// 			file: null
// 		}])
// 	}

// 	const handleChange = (index, field, value) => {
// 		const updatedFields = [...fields]
// 		updatedFields[index][field] = value
// 		setFields(updatedFields)
// 	}

// 	const handleFileChange = (index, file) => {
// 		const updatedFields = [...fields]
// 		updatedFields[index].file = file
// 		setFields(updatedFields)
// 	}

// 	const handleRemove = (index) => {
// 		const updatedFields = [...fields]
// 		updatedFields.splice(index, 1) // Remove the selected form
// 		setFields(updatedFields)
// 	}

// 	const handleSubmit = async () => {
// 		try {
// 			const { response, error } = await saveTimeSheet(fields)
// 			if (error) {
// 				toast.error(error, successAndCatchErrorToastOptions)
// 				return
// 			}

// 			if (response.status === 401) {
// 				removeUserLogged()
// 				navigate('/')
// 				return
// 			}

// 			if (response.status === 201) {
// 				const data = await response.json()
// 				navigate('/timereport/')
// 				toast.success(data, successAndCatchErrorToastOptions)
// 			} else {
// 				const responseData = await response.json()
// 				toast.error(responseData, errorToastOptions)
// 			}
// 		} catch (error) {
// 			toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const handleReadProjectName = async (hr = false, employee = false, inProgress = false, userId, deleted = false) => {
// 		try {
// 			const { response, error } = await readProjectName(hr, employee, inProgress, userId, deleted)

// 			if (error) {
// 				toast.error(error, errorToastOptions)
// 				return
// 			}

// 			if (response.status === 401) {
// 				removeUserLogged()
// 				navigate('/')
// 				return
// 			}

// 			if (response.ok) {
// 				const projectInfo = await response.json()
// 				setProjectList(projectInfo)
// 			}
// 		} catch (error) {
// 			toast.error(
// 				'Something went wrong. Please try again later.',
// 				successAndCatchErrorToastOptions
// 			)
// 		}
// 	}
	

// 	return (
// 		<>
// 			<PageBreadcrumb title="Report" />
// 			<Row>
// 				<Col xs={12}>
// 					<Card>
// 						<CardBody>
// 							<Row className="mb-3">
// 								<Col xs={12} sm={6} md={3}>
// 									<Form.Label>Date</Form.Label>
// 									<Form.Control
// 										type="date"
// 										value={new Date().toISOString().split('T')[0]}
// 										className="form-control w-auto"
// 										readOnly
// 									/>
// 								</Col>
// 							</Row>

// 							<Row className="fw-bold border-bottom mb-3 d-none d-md-flex text-center">
// 								<Col md={3}>Project <span className="text-danger">*</span></Col>
// 								<Col md={3}>Task <span className="text-danger">*</span></Col>
// 								<Col md={2}>Hours <span className="text-danger">*</span></Col>
// 								<Col md={4}>Documents</Col>
// 							</Row>

// 							{fields.map((field, index) => (
// 								<Row key={field.id} className="mb-4">
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Project</Form.Label>
// 										<Form.Select
// 											value={field.projectId}
// 											onChange={(e) => handleChange(index, "projectId", e.target.value)}
// 										>
// 											<option value="">Select a project</option>
// 											{projectList?.map((project) => (
// 												<option key={project.projectId} value={project.projectId}>
// 													{capitalizeFirst(project.projectName)}
// 												</option>
// 											))}
// 										</Form.Select>
// 									</Col>
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Task</Form.Label>
// 										<Form.Control
// 											as="textarea"
// 											rows={3}
// 											placeholder="Enter task"
// 											value={field.task}
// 											onChange={(e) => handleChange(index, "task", e.target.value)}
// 										/>
// 									</Col>
// 									<Col xs={12} md={2} className="mb-2">
// 										<Form.Label className="d-md-none">Hours</Form.Label>
// 										<Form.Control
// 											type="number"
// 											step="any"
// 											placeholder="Hours"
// 											value={field.hoursWorked}
// 											onChange={(e) => handleChange(index, "hoursWorked", e.target.value)}
// 										/>
// 										<Form.Text className="text-muted small">
// 											Enter hours (<b>e.g.,</b> 1 for 1, 1.15 for 1:25, 1.30 for 1:50, 1.45 for 1:75)
// 										</Form.Text>
// 									</Col>
// 									<Col xs={12} md={4} className="mb-2">
// 										<Form.Label className="d-md-none">Documents</Form.Label>
// 										<Form.Control
// 											type="file"
// 											accept=".jpg,.jpeg,.png,.xls,.xlsx"
// 											onChange={(e) => handleFileChange(index, e.target.files[0])}
// 										/>
// 										<Form.Text className="text-muted small">
// 											Maximum uploaded file size: 5MB (<b>Supported Only:</b> .jpg, .jpeg, .png, .xls, .xlsx)
// 										</Form.Text>
// 										<div className="mt-2 text-end">
// 											<Button 
// 												variant="danger" 
// 												size="sm"
// 												onClick={() => handleRemove(index)}
// 											>
// 												Remove
// 											</Button>
// 										</div>
// 									</Col>
									
// 								</Row>
// 							))}

// 							<Row className="mt-3 justify-content-end">
// 								<Col xs="auto">
// 									<Button onClick={handleAdd} className="me-2">Add</Button>
// 									{fields.length > 0 && (
// 										<Button onClick={handleSubmit} disabled={loading} className="btn btn-success">Submit</Button>
// 									)}
// 								</Col>
// 							</Row>
// 						</CardBody>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</>
// 	)
// }

// export default Timesheet


// import { useEffect, useState } from "react"
// import { PageBreadcrumb } from '@/components'
// import { Row, Col, Card, CardBody, Button, Form, Spinner } from "react-bootstrap"
// import { readProjectName, saveTimeSheet } from './Api'
// import { capitalizeFirst } from "./utils.js/util"
// import { toast } from "sonner"
// import { errorToastOptions, successAndCatchErrorToastOptions} from "./utils.js/Toastoption"
// import { useNavigate } from "react-router-dom"

// const Timesheet = () => {
// 	const [fields, setFields] = useState([])
// 	const [projectList, setProjectList] = useState([])
// 	const user = JSON.parse(localStorage.getItem('user')) || ''
// 	const [loading, setLoading] = useState(false)
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		handleReadProjectName(false, false, true, user.userId, true)
// 		// Initialize with one empty field if none exist
// 		if (fields.length === 0) {
// 			handleAdd()
// 		}
// 	}, [])

// 	const handleAdd = () => {
// 		setFields([...fields, {
// 			id: Date.now(), // Use timestamp for unique ID
// 			projectId: '',
// 			task: '',
// 			hoursWorked: '',
// 			userId: user?.userId,
// 			file: null
// 		}])
// 	}

// 	const handleChange = (index, field, value) => {
// 		const updatedFields = [...fields]
// 		updatedFields[index][field] = value
// 		setFields(updatedFields)
// 	}

// 	const handleFileChange = (index, file) => {
// 		// Validate file if one is provided
// 		if (file) {
// 			// Check file size (5MB limit)
// 			if (file.size > 5 * 1024 * 1024) {
// 				toast.error(`File size exceeds 5MB limit: ${file.name}`, errorToastOptions)
// 				return
// 			}
			
// 			// Check file type
// 			const allowedTypes = [
// 				'image/jpeg', 
// 				'image/jpg', 
// 				'image/png',
// 				'application/vnd.ms-excel',
// 				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
// 			]
			
// 			if (!allowedTypes.includes(file.type)) {
// 				toast.error(`Invalid file type: ${file.name}. Only JPG, PNG, and Excel files are allowed.`, errorToastOptions)
// 				return
// 			}
// 		}
		
// 		const updatedFields = [...fields]
// 		updatedFields[index].file = file
// 		setFields(updatedFields)
// 	}

// 	const handleRemove = (index) => {
// 		const updatedFields = [...fields]
// 		updatedFields.splice(index, 1) // Remove the selected form
// 		setFields(updatedFields)
// 	}

// 	const handleSubmit = async () => {		
// 		try {
// 			setLoading(true)
			
// 			const { response, error } = await saveTimeSheet(fields)
			
// 			if (error) {
// 				toast.error(error, successAndCatchErrorToastOptions)
// 				return
// 			}

// 			if (response.status === 401) {
// 				removeUserLogged()
// 				navigate('/')
// 				return
// 			}

// 			if (response.status === 201) {
// 				const data = await response.json()
// 				navigate('/timereport/')
// 				toast.success(data, successAndCatchErrorToastOptions)
// 			} else {
// 				const responseData = await response.json()
// 				toast.error(responseData, errorToastOptions)
// 			}
// 		} catch (error) {
// 			toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const handleReadProjectName = async (hr = false, employee = false, inProgress = false, userId, deleted = false) => {
// 		try {
// 			const { response, error } = await readProjectName(hr, employee, inProgress, userId, deleted)

// 			if (error) {
// 				toast.error(error, errorToastOptions)
// 				return
// 			}

// 			if (response.status === 401) {
// 				removeUserLogged()
// 				navigate('/')
// 				return
// 			}

// 			if (response.ok) {
// 				const projectInfo = await response.json()
// 				setProjectList(projectInfo)
// 			}
// 		} catch (error) {
// 			toast.error(
// 				'Something went wrong. Please try again later.',
// 				successAndCatchErrorToastOptions
// 			)
// 		}
// 	}
	
// 	// Helper function to display file info
// 	const renderFileInfo = (field, index) => {
// 		if (!field.file) return null
		
// 		return (
// 			<div className="mt-2 small">
// 				<div className="d-flex align-items-center">
// 					<div className="text-truncate me-2">
// 						{field.file.name} ({formatFileSize(field.file.size)})
// 					</div>
// 					<Button 
// 						variant="link" 
// 						className="text-danger p-0 ms-auto"
// 						onClick={() => handleFileChange(index, null)}
// 					>
// 						Remove
// 					</Button>
// 				</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<>
// 			<PageBreadcrumb title="Report" />
// 			<Row>
// 				<Col xs={12}>
// 					<Card>
// 						<CardBody>
// 							<Row className="mb-3">
// 								<Col xs={12} sm={6} md={3}>
// 									<Form.Label>Date</Form.Label>
// 									<Form.Control
// 										type="date"
// 										value={new Date().toISOString().split('T')[0]}
// 										className="form-control w-auto"
// 										readOnly
// 									/>
// 								</Col>
// 							</Row>

// 							<Row className="fw-bold border-bottom mb-3 d-none d-md-flex">
// 								<Col md={3}>Project <span className="text-danger">*</span></Col>
// 								<Col md={3}>Task <span className="text-danger">*</span></Col>
// 								<Col md={2}>Hours <span className="text-danger">*</span></Col>
// 								<Col md={4}>Documents</Col>
// 							</Row>

// 							{fields.map((field, index) => (
// 								<Row 
// 									key={field.id} 
// 									className="mb-4 pb-3 border-bottom"
// 									id={`timesheet-row-${index}`}
// 								>
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Project <span className="text-danger">*</span></Form.Label>
// 										<Form.Select
// 											value={field.projectId}
// 											onChange={(e) => handleChange(index, "projectId", e.target.value)}
// 											disabled={loading}
// 										>
// 											<option value="">Select a project</option>
// 											{projectList?.map((project) => (
// 												<option key={project.projectId} value={project.projectId}>
// 													{capitalizeFirst(project.projectName)}
// 												</option>
// 											))}
// 										</Form.Select>
// 									</Col>
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Task <span className="text-danger">*</span></Form.Label>
// 										<Form.Control
// 											as="textarea"
// 											rows={3}
// 											placeholder="Enter task description"
// 											value={field.task}
// 											onChange={(e) => handleChange(index, "task", e.target.value)}
// 											disabled={loading}
// 										/>
// 									</Col>
// 									<Col xs={12} md={2} className="mb-2">
// 										<Form.Label className="d-md-none">Hours <span className="text-danger">*</span></Form.Label>
// 										<Form.Control
// 											type="number"
// 											step="0.25"
// 											min="0.25"
// 											max="24"
// 											placeholder="Hours"
// 											value={field.hoursWorked}
// 											onChange={(e) => handleChange(index, "hoursWorked", e.target.value)}
// 											disabled={loading}
// 										/>
// 										<Form.Text className="text-muted small">
// 											Enter hours (<b>e.g.,</b> 1 for 1, 1.25 for 1:30, 1.50 for 1:50, 1.75 for 1:75)
// 										</Form.Text>
// 									</Col>
// 									<Col xs={12} md={4} className="mb-2">
// 										<Form.Label className="d-md-none">Documents</Form.Label>
// 										{!field.file ? (
// 											<Form.Control
// 												type="file"
// 												accept=".jpg,.jpeg,.png,.xls,.xlsx"
// 												onChange={(e) => handleFileChange(index, e.target.files[0])}
// 												disabled={loading}
// 											/>
// 										) : renderFileInfo(field, index)}
										
// 										<Form.Text className="text-muted small">
// 											Maximum uploaded file size: 5MB (<b>Supported Only:</b> .jpg, .jpeg, .png, .xls, .xlsx)
// 										</Form.Text>
										
// 										<div className="mt-2 text-end">
// 											<Button 
// 												variant="danger" 
// 												size="sm"
// 												onClick={() => handleRemove(index)}
// 												disabled={loading || fields.length <= 1}
// 											>
// 												Remove
// 											</Button>
// 										</div>
// 									</Col>
// 								</Row>
// 							))}

// 							<Row className="mt-3 justify-content-end">
// 								<Col xs="auto">
// 									<Button 
// 										onClick={handleAdd} 
// 										className="me-2"
// 										disabled={loading}
// 									>
// 										Add
// 									</Button>
									
// 									<Button 
// 										onClick={handleSubmit} 
// 										disabled={loading} 
// 										className="btn btn-success"
// 									>
// 										{loading ? (
// 											<>
// 												<Spinner 
// 													as="span" 
// 													animation="border" 
// 													size="sm" 
// 													role="status" 
// 													aria-hidden="true" 
// 													className="me-2"
// 												/>
// 												Submitting...
// 											</>
// 										) : "Submit"}
// 									</Button>
// 								</Col>
// 							</Row>
// 						</CardBody>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</>
// 	)
// }

// export default Timesheet


import { useEffect, useState } from "react"
import { PageBreadcrumb } from '@/components'
import { Row, Col, Card, CardBody, Button, Form, Spinner } from "react-bootstrap"
import { readProjectName, saveTimeSheet } from './Api'
import { capitalizeFirst } from "./utils.js/util"
import { toast } from "sonner"
import { errorToastOptions, successAndCatchErrorToastOptions} from "./utils.js/Toastoption"
import { useNavigate } from "react-router-dom"

// Helper function to format file size in KB or MB
const formatFileSize = (bytes) => {
	if (bytes >= 1024 * 1024) {
		// If file is 1MB or larger, show in MB with 2 decimal places
		return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
	} else {
		// For smaller files, show in KB with 1 decimal place
		return `${(bytes / 1024).toFixed(1)} KB`;
	}
}

const Timesheet = () => {
	const [fields, setFields] = useState([])
	const [projectList, setProjectList] = useState([])
	const user = JSON.parse(localStorage.getItem('user')) || ''
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		handleReadProjectName(false, false, true, user.userId, true)
		// Initialize with one empty field if none exist
		if (fields.length === 0) {
			handleAdd()
		}
	}, [])

	const handleAdd = () => {
		setFields([...fields, {
			id: Date.now(), // Use timestamp for unique ID
			projectId: '',
			task: '',
			hoursWorked: '',
			userId: user?.userId,
			file: null
		}])
	}

	const handleChange = (index, field, value) => {
		const updatedFields = [...fields]
		updatedFields[index][field] = value
		setFields(updatedFields)
	}

	const handleFileChange = (index, file) => {
		// Validate file if one is provided
		// if (file) {
		// 	// Check file size (5MB limit)
		// 	if (file.size > 5 * 1024 * 1024) {
		// 		toast.error(`File size exceeds 5MB limit: ${file.name}`, errorToastOptions)
		// 		return
		// 	}
			
		// 	// Check file type
		// 	const allowedTypes = [
		// 		'image/jpeg', 
		// 		'image/jpg', 
		// 		'image/png',
		// 		'application/vnd.ms-excel',
		// 		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		// 	]
			
		// 	if (!allowedTypes.includes(file.type)) {
		// 		toast.error(`Invalid file type: ${file.name}. Only JPG, PNG, and Excel files are allowed.`, errorToastOptions)
		// 		return
		// 	}
		// }
		
		const updatedFields = [...fields]
		updatedFields[index].file = file
		setFields(updatedFields)
	}

	const handleRemove = (index) => {
		const updatedFields = [...fields]
		updatedFields.splice(index, 1) // Remove the selected form
		setFields(updatedFields)
	}

	const handleSubmit = async () => {		
		const timesheetData = fields.map(({ projectId, task, hoursWorked, userId }) => ({
            projectId: parseInt(projectId),
            task,
            hoursWorked: parseFloat(hoursWorked),
            workDate: new Date().toISOString().split('T')[0],
            userId: userId
        }))

        // Create FormData for multipart request
        const formData = new FormData()
        
        // Add timesheet data as JSON
        formData.append("timesheets", JSON.stringify(timesheetData))

        // Track which entries have files with their indices
        const fileIndices = []
        
        // Add files with explicit index in the field name
        // This is the key fix - each file is explicitly associated with its entry index
        fields.forEach((field, index) => {
            if (field.file) {
                // Use a field name that includes the entry index
                formData.append(`file_${index}`, field.file)
                fileIndices.push(index)
            }
        })
        
        // Add file indices array to help backend with additional validation
        formData.append("fileIndices", JSON.stringify(fileIndices))
		try {
			setLoading(true)
			
			const { response, error } = await saveTimeSheet(formData)
			
			if (error) {
				toast.error(error, successAndCatchErrorToastOptions)
				return
			}

			if (response.status === 401) {
				removeUserLogged()
				navigate('/')
				return
			}

			if (response.status === 201) {
				const data = await response.json()
				navigate('/timereport/')
				toast.success(data, successAndCatchErrorToastOptions)
			} else {
				const responseData = await response.json()
				toast.error(responseData, errorToastOptions)
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
		} finally {
			setLoading(false)
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
	
	// Helper function to display file info
	const renderFileInfo = (field, index) => {
		if (!field.file) return null
		
		return (
			<div className="mt-2 small">
				<div className="d-flex align-items-center">
					<div className="text-truncate me-2">
						{field.file.name} ({formatFileSize(field.file.size)})
					</div>
					<Button 
						variant="link" 
						className="text-danger p-0 ms-auto"
						onClick={() => handleFileChange(index, null)}
					>
						Remove
					</Button>
				</div>
			</div>
		)
	}

	return (
		<>
			<PageBreadcrumb title="Report" />
			<Row>
				<Col xs={12}>
					<Card>
						<CardBody>
							<Row className="mb-3">
								<Col xs={12} sm={6} md={3}>
									<Form.Label>Date</Form.Label>
									<Form.Control
										type="date"
										value={new Date().toISOString().split('T')[0]}
										className="form-control w-auto"
										readOnly
									/>
								</Col>
							</Row>

							<Row className="fw-bold border-bottom mb-3 d-none d-md-flex">
								<Col md={3}>Project <span className="text-danger">*</span></Col>
								<Col md={3}>Task <span className="text-danger">*</span></Col>
								<Col md={2}>Hours <span className="text-danger">*</span></Col>
								<Col md={4}>Documents</Col>
							</Row>

							{fields.map((field, index) => (
								<Row 
									key={field.id} 
									className="mb-4 pb-3 border-bottom"
									id={`timesheet-row-${index}`}
								>
									<Col xs={12} md={3} className="mb-2">
										<Form.Label className="d-md-none">Project <span className="text-danger">*</span></Form.Label>
										<Form.Select
											value={field.projectId}
											onChange={(e) => handleChange(index, "projectId", e.target.value)}
										>
											<option value="">Select a project</option>
											{projectList?.map((project) => (
												<option key={project.projectId} value={project.projectId}>
													{capitalizeFirst(project.projectName)}
												</option>
											))}
										</Form.Select>
									</Col>
									<Col xs={12} md={3} className="mb-2">
										<Form.Label className="d-md-none">Task <span className="text-danger">*</span></Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											placeholder="Enter task description"
											value={field.task}
											onChange={(e) => handleChange(index, "task", e.target.value)}
										/>
									</Col>
									<Col xs={12} md={2} className="mb-2">
										<Form.Label className="d-md-none">Hours <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="number"
											step="0.25"
											min="0.25"
											max="24"
											placeholder="Hours"
											value={field.hoursWorked}
											onChange={(e) => handleChange(index, "hoursWorked", e.target.value)}
										/>
										<Form.Text className="text-muted small">
											Enter hours (<b>e.g.,</b> 1 for 1, 1.25 for 1:30, 1.50 for 1:50, 1.75 for 1:75)
										</Form.Text>
									</Col>
									<Col xs={12} md={4} className="mb-2">
										<Form.Label className="d-md-none">Documents</Form.Label>
										{!field.file ? (
											<Form.Control
												type="file"
												accept=".jpg,.jpeg,.png,.xls,.xlsx"
												onChange={(e) => handleFileChange(index, e.target.files[0])}
											/>
										) : renderFileInfo(field, index)}
										
										<Form.Text className="text-muted small">
											Maximum uploaded file size: 5MB (<b>Supported Only:</b> .jpg, .jpeg, .png, .xls, .xlsx)
										</Form.Text>
										
										<div className="mt-2 text-end">
											<Button 
												variant="danger" 
												size="sm"
												onClick={() => handleRemove(index)}
												disabled={loading || fields.length <= 1}
											>
												Remove
											</Button>
										</div>
									</Col>
								</Row>
							))}

							<Row className="mt-3 justify-content-end">
								<Col xs="auto">
									<Button 
										onClick={handleAdd} 
										className="me-2"
										disabled={loading}
									>
										Add
									</Button>
									
									<Button 
										onClick={handleSubmit} 
										disabled={loading} 
										className="btn btn-success"
									>
										{loading ? (
											<>
												<Spinner 
													as="span" 
													animation="border" 
													size="sm" 
													role="status" 
													aria-hidden="true" 
													className="me-2"
												/>
												Submitting...
											</>
										) : "Submit"}
									</Button>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Timesheet