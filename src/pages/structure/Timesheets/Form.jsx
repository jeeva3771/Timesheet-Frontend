import { PageBreadcrumb } from '@/components'
import {
    Card,
    CardBody,
    Col,
    Form,
    Row,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { readTimeSheetById, readProjectName, updateTimeSheet } from '../Api'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from '../utils.js/Toastoption'
import { useAuthContext } from '@/context'
import { capitalizeFirst, formatDateToInput } from '../utils.js/util'

const TimesheetEditForm = () => {
    const { timesheetId } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { removeUserLogged } = useAuthContext()
    const [ projectList, setProjectList ] = useState([])
    // const [adminAndManagerData, setAdminAndManagerData] = useState([])
    // const [hrAndEmployeeData, setHrAndEmployeeData] = useState([])
    const [timesheetData, setTimesheetData] = useState({
        name: undefined,
        projectId: undefined,
        workDate: undefined,
        hoursWorked: undefined,
        task: undefined
    })
    useEffect(() => {
        if (timesheetId) {
            handleReadTimeSheetById(timesheetId)
        }
    }, [timesheetId])
    
    // Fixed: Separate useEffect for project loading
    useEffect(() => {
        if (timesheetData.userId) {
            handleReadProjectName(true, true, true, timesheetData.userId, false, true)
        }
    }, [timesheetData.userId])

    const handleReadTimeSheetById = async (timesheetId) => {
        try {
            const { response, error } = await readTimeSheetById(timesheetId)
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
                const [timesheet] = await response.json()
                setTimesheetData({
                    userId: timesheet.userId, 
                    name: capitalizeFirst(timesheet.createdName),
                    projectId: timesheet.projectId,
                    workDate: formatDateToInput(timesheet.workedDate),
                    hoursWorked: Number(timesheet.hoursWorked) % 1 === 0 
                        ? parseInt(timesheet.hoursWorked)
                        : parseFloat(timesheet.hoursWorked).toFixed(2),
                    task: timesheet.task
                })

            } else {
                toast.error(await response.json(), errorToastOptions)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong.Please try later', successAndCatchErrorToastOptions)
        }
    }

    const handleReadProjectName = async (hr = false, employee = false, inProgress = false, userId, deleted = false, condition = false) => {
        try {
            const { response, error } = await readProjectName(hr, employee, inProgress, userId, deleted, condition)

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

    const handleSubmit = async () => {
        // Validate form
        // if (!timesheetData.projectId || !timesheetData.workDate || 
        //     !timesheetData.hoursWorked || !timesheetData.task) {
        //     toast.error('Please fill all required fields', errorToastOptions)
        //     return
        // }
        
        setLoading(true)
        
        try {
            // Assuming you have an API function for updating a timesheet
            const { response, error } = await updateTimeSheet(timesheetId, {
                projectId: timesheetData.projectId,
                workDate: timesheetData.workDate,
                hoursWorked: timesheetData.hoursWorked,
                task: timesheetData.task
            })
            
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
                toast.success(result, successAndCatchErrorToastOptions)
                navigate('/timesheets/')
            } else {
                const errorResponse = await response.json()
                if (Array.isArray(errorResponse)) {
                    toast.error(
                        errorResponse.map((message, index) => (
                            <p key={index} className="m-0 p-0">{message}</p>
                        )),
                        errorToastOptions
                    )
                } else {
                    toast.error(errorResponse, errorToastOptions)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
        <PageBreadcrumb subName="Time Sheets List" title="Edit" />
        <Row>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Row className="d-flex justify-content-center">
                        
                            <Col lg="6">
                                <h2 className="text-center">Time Sheets Form</h2>
                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="name" 
                                                className="col-sm-2 col-form-label text-end text-nowrap"
                                            >Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="name"
                                                    type="text"
                                                    value={timesheetData.name}
                                                    readOnly
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group className="mb-3">
                                        <Row className="mb-3">						
                                            <Form.Label 
                                                htmlFor="projectName"
                                                className="col-sm-2 col-form-label text-end"
                                            >Project Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Select
                                                    id="projectName"
                                                    value={timesheetData.projectId}
                                                    onChange={(e) => setTimesheetData({ ...timesheetData, projectId: e.target.value })}
                                                >
                                                    <option value="">Select a project</option> 
                                                    {projectList && projectList.length > 0 ? (
                                                        projectList.map((project) => {
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
                                                        })
                                                    ) : (
                                                        <option disabled>No projects found</option>
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>
                                 
                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="task" 
                                                className="col-sm-2 col-form-label text-end text-nowrap"
                                            >Task <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    id="task"
                                                    value={timesheetData.task}
                                                    onChange={(e) => setTimesheetData({ ...timesheetData, task: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="hoursWorked" 
                                                className="col-sm-2 col-form-label text-end"
                                            >Hour(s) Worked <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="hoursWorked"
                                                    type="number"
                                                    value={timesheetData.hoursWorked}
                                                    onChange={(e) => setTimesheetData({ ...timesheetData, hoursWorked: e.target.value })}
                                                />
                                                <Form.Text className="text-muted small">
                                                    Enter hours (<b>e.g.,</b> 1 for 1, 1.15 for 1:25, 1.30 for 1:50, 1.45 for 1:75)
                                                </Form.Text>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>
                                
                
                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="date" 
                                                className="col-sm-2 col-form-label text-end"
                                            >Date <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="date"
                                                    type="date"
                                                    value={timesheetData.workDate}
                                                    onChange={(e) => setTimesheetData({ ...timesheetData, workDate: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="d-flex justify-content-center mb-4">
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Row>
                            </Col>
                            
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default TimesheetEditForm

