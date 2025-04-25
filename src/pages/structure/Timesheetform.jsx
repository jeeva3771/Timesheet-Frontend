// import { useState } from "react"
// import { PageBreadcrumb } from '@/components'
// import { Row, Col, Card, CardBody, Button, Form } from "react-bootstrap"

// const Timesheet = () => {
// 	const [fields, setFields] = useState([])

// 	const handleAdd = () => {
// 		setFields([...fields, { id: fields.length + 1 }])
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
//                                         className="form-control w-auto"
// 										readOnly
// 									/>
// 								</Col>
// 							</Row>

// 							{/* Header Row */}
// 							<Row className="fw-bold border-bottom mb-3 d-none d-md-flex text-center">
// 								<Col md={3}>Project</Col>
// 								<Col md={3}>Task</Col>
// 								<Col md={2}>Hours</Col>
// 								<Col md={4}>Documents</Col>
// 							</Row>

// 							{/* Dynamic Field Rows */}
// 							{fields.map((field) => (
// 								<Row key={field.id} className="mb-4">
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Project</Form.Label>
// 										<Form.Select defaultValue="">
// 											<option value="" disabled>Select a project</option>
// 											<option value="1">Digital Marketing</option>
// 											<option value="2">Hotel Management</option>
// 											<option value="3">Product Development</option>
// 											<option value="4">Timesheet</option>
// 										</Form.Select>
// 									</Col>
// 									<Col xs={12} md={3} className="mb-2">
// 										<Form.Label className="d-md-none">Task</Form.Label>
// 										<Form.Control
// 											as="textarea"
// 											rows={3}
// 											placeholder="Enter task"
// 										/>
// 									</Col>
// 									<Col xs={12} md={2} className="mb-2">
// 										<Form.Label className="d-md-none">Hours</Form.Label>
// 										<Form.Control type="number" placeholder="Hours" />
// 										<Form.Text className="text-muted small">
//                                             Enter hours (<b>e.g.,</b> 1 for 1, 1.15 for 1:25, 1.30 for 1:50, 1.45 for 1.75)
// 										</Form.Text>
// 									</Col>
// 									<Col xs={12} md={4} className="mb-2">
// 										<Form.Label className="d-md-none">Documents</Form.Label>
// 										<Form.Control type="file" accept=".jpg,.jpeg,.png,.xls,.xlsx" />
// 										<Form.Text className="text-muted small">
//                                             Maximum uploaded file size: 5MB (<b>Supported Only:</b> .jpg, .jpeg, .png, .xls, .xlsx)
// 										</Form.Text>
// 									</Col>
// 								</Row>
// 							))}

// 							{/* Action Buttons */}
// 							<Row className="mt-3 justify-content-end">
// 								<Col xs="auto">
// 									<Button onClick={handleAdd} className="me-2">Add</Button>
// 									{fields.length > 0 && (
// 										<Button className="btn btn-success">Submit</Button>
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


import { useEffect, useState } from "react"
import { PageBreadcrumb } from '@/components'
import { Row, Col, Card, CardBody, Button, Form } from "react-bootstrap"
import { readProjectName } from './Api'
import { capitalizeFirst } from "./utils.js/util"
const apiUrl = import.meta.env.VITE_API_URL

const Timesheet = () => {
	const [fields, setFields] = useState([])
	const [projectList, setProjectList] = useState([])
	const user = JSON.parse(localStorage.getItem('user')) || ''


	useEffect(() => {
		handleReadProjectName(false, false, true, user.userId, true)
	}, [])

	const handleAdd = () => {
		setFields([...fields, {
			id: fields.length + 1,
			projectId: '',
			task: '',
			hoursWorked: '',
			file: null
		}])
	}

	const handleChange = (index, field, value) => {
		const updatedFields = [...fields]
		updatedFields[index][field] = value
		setFields(updatedFields)
	}

	const handleFileChange = (index, file) => {
		const updatedFields = [...fields]
		updatedFields[index].file = file
		setFields(updatedFields)
	}

	const handleSubmit = async () => {
		const timesheetData = fields.map(({ projectId, task, hoursWorked }) => ({
			projectId: parseInt(projectId),
			task,
			hoursWorked: parseFloat(hoursWorked),
			workDate: new Date().toISOString().split('T')[0],
		}))

		const formData = new FormData()
		formData.append("timesheets", JSON.stringify(timesheetData))

        // fields.forEach((field, index) => {
        //     if (field.file) {
        //         formData.append("reportdocuploads", field.file); // or "reportdocuploads[]" if backend expects it
        //     }
        // });
        fields.forEach((field, index) => {
            formData.append("reportdocuploads", field.file || new Blob([], { type: 'application/octet-stream' }))
        })
        
		try {
			const res = await fetch(`${apiUrl}/api/timesheets/`, {
				method: "POST",
				body: formData,
				credentials: 'include'
			})
			const result = await res.text()
			console.log("Success:", result)
		} catch (error) {
            console.log(error)
			console.error("Error submitting timesheet:", error)
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

							<Row className="fw-bold border-bottom mb-3 d-none d-md-flex text-center">
								<Col md={3}>Project</Col>
								<Col md={3}>Task</Col>
								<Col md={2}>Hours</Col>
								<Col md={4}>Documents</Col>
							</Row>

							{fields.map((field, index) => (
								<Row key={field.id} className="mb-4">
									<Col xs={12} md={3} className="mb-2">
										<Form.Label className="d-md-none">Project</Form.Label>
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
										<Form.Label className="d-md-none">Task</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											placeholder="Enter task"
											value={field.task}
											onChange={(e) => handleChange(index, "task", e.target.value)}
										/>
									</Col>
									<Col xs={12} md={2} className="mb-2">
										<Form.Label className="d-md-none">Hours</Form.Label>
										<Form.Control
											type="number"
											step="any"
											placeholder="Hours"
											value={field.hoursWorked}
											onChange={(e) => handleChange(index, "hoursWorked", e.target.value)}
										/>
										<Form.Text className="text-muted small">
											Enter hours (<b>e.g.,</b> 1 for 1, 1.15 for 1:25, 1.30 for 1:50, 1.45 for 1:75)
										</Form.Text>
									</Col>
									<Col xs={12} md={4} className="mb-2">
										<Form.Label className="d-md-none">Documents</Form.Label>
										<Form.Control
											type="file"
											accept=".jpg,.jpeg,.png,.xls,.xlsx"
											onChange={(e) => handleFileChange(index, e.target.files[0])}
										/>
										<Form.Text className="text-muted small">
											Maximum uploaded file size: 5MB (<b>Supported Only:</b> .jpg, .jpeg, .png, .xls, .xlsx)
										</Form.Text>
									</Col>
								</Row>
							))}

							<Row className="mt-3 justify-content-end">
								<Col xs="auto">
									<Button onClick={handleAdd} className="me-2">Add</Button>
									{fields.length > 0 && (
										<Button onClick={handleSubmit} className="btn btn-success">Submit</Button>
									)}
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Timesheet;
