import { FormInputPassword, PageBreadcrumb, SelectInput } from '@/components'
import FormInput from '@/components/form/FormTextInput'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormControl,
    FormLabel,
    FormSelect,
    InputGroup,
    Row,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { readUserNameAndRole, readProjectById, saveOrUpdateProject } from '../Api'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from '../utils.js/Toastoption'
import { useAuthContext } from '@/context'
import { capitalizeFirst, formatDateToInput } from '../utils.js/util'

const ProjectForm = () => {
    const { projectId } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { removeUserLogged } = useAuthContext()
    const [adminAndManagerData, setAdminAndManagerData] = useState([])
    const [hrAndEmployeeData, setHrAndEmployeeData] = useState([])
    const [projectData, setProjectData] = useState({
        projectName: undefined,
        clientName: undefined,
        managerId: undefined,
        employeeIds: undefined,
        startDate: undefined,
        endDate: undefined,
        status: undefined
    })
    useEffect (() => {
        handleReadUserNameAndRole(true)
        handleReadUserNameAndRole(false)
    }, [])

    useEffect(() => {
        if (projectId && hrAndEmployeeData.length > 0) {
            handleReadProjectById(projectId)
        }
    }, [projectId, hrAndEmployeeData])

    const handleReadProjectById = async (projectId) => {
        try {
            const { response, error } = await readProjectById(projectId)
            if (error) {
                toast.error(error, successAndCatchErrorToastOptions)
                return
            }

            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }
            
            if (response.ok) {
                const users = await response.json()
                const user = users[0] 
                const mappedEmployees = Array.isArray(user.assignedEmployeeIds)
                    ? user.assignedEmployeeIds.map(empId => {
                        const emp = hrAndEmployeeData.find(user => user.userId === empId)
                        return {
                            value: empId,
                            label: `${capitalizeFirst(emp?.name || '')} - (${capitalizeFirst(emp?.role || '')})`,
                        }
                    })
                    : []
                setProjectData({
                    projectName: user.projectName,
                    clientName: user.clientName,
                    managerId: user.managerId,
                    employeeIds:mappedEmployees,
                    startDate: formatDateToInput(user.startDate),
                    endDate: formatDateToInput(user.endDate),
                    status: user.status
                })

            } else {
                toast.error(await response.json(), successAndCatchErrorToastOptions)
            }
        } catch (error) {
            toast.error('Something went wrong.Please try later', successAndCatchErrorToastOptions)
        }
    }
    
    
    const handleReadUserNameAndRole= async (requireAuth = false) => {
        try {
            const { response, error } = await readUserNameAndRole(requireAuth)
            if (error) {
                toast.error(error, successAndCatchErrorToastOptions)
                return
            }  
            
            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }
        
            if (response.ok) {
                const userInfo = await response.json()
                if (requireAuth) {
                    setAdminAndManagerData(userInfo)
                    
                } else {
                    setHrAndEmployeeData(userInfo)
                }
            } 
        } catch (error) {
            toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            projectName: projectData.projectName,
            clientName: projectData.clientName,
            managerId: projectData.managerId,
            employeeIds: Array.isArray(projectData.employeeIds)
                ? projectData.employeeIds.map(emp => emp.value) // convert to ['emp1', 'emp2']
                : [],
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            status: projectData.status,
        }

        try {
            const { response, error } = await saveOrUpdateProject(projectId, payload)
            if (error) {
                toast.error(error, successAndCatchErrorToastOptions)
                return
            }

            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }

            if ([200, 201].includes(response.status)) {
                const data = await response.json()
                navigate('/projects/')
                toast.success(data, successAndCatchErrorToastOptions)
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
            setLoading(false)
        }
    }
    return (
        <>
        <PageBreadcrumb subName="Projects List" title={projectId ? "Edit" : "Add"} />
        <Row>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Row className="d-flex justify-content-center">
                        
                            <Col lg="6">
                                <h2 className="text-center">Project Form</h2>
                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="project" 
                                                className="col-sm-2 col-form-label text-end text-nowrap"
                                            >Project Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="project"
                                                    type="text"
                                                    value={projectData.projectName}
                                                    onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="client" 
                                                className="col-sm-2 col-form-label text-end text-nowrap"
                                            >  Client Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="client"
                                                    type="text"
                                                    value={projectData.clientName}
                                                    onChange={(e) => setProjectData({ ...projectData, clientName: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>
                                
                                <Row className="mb-3">
                                    <Form.Group className="mb-3">
                                        <Row className="mb-3">						
                                            <Form.Label 
                                                htmlFor="manager"
                                                className="col-sm-2 col-form-label text-end"
                                            >Manager Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Select
                                                    id="manager"
                                                    value={projectData.managerId}
                                                    onChange={(e) => setProjectData({ ...projectData, managerId: e.target.value })}
                                                >
                                                    <option value="">Select a manager</option>
                                                    {adminAndManagerData
                                                        .sort((a, b) => {
                                                            if (a.role.toLowerCase() === 'admin') return -1;
                                                            if (b.role.toLowerCase() === 'admin') return 1;
                                                            return 0;
                                                        })
                                                        .map((data) => (
                                                            <option key={data.userId} value={data.userId}>
                                                            {capitalizeFirst(data.name)} - ({capitalizeFirst(data.role)})
                                                            </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-5">
                                    <Form.Label className="col-sm-2 col-form-label text-end">
                                        Allot Employee <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col sm="10">
                                    <Select
                                        isMulti
                                        placeholder="Select employees"
                                        closeMenuOnSelect={false}
                                        options={hrAndEmployeeData
                                            .sort((a, b) => {
                                                if (a.role.toLowerCase() === 'employee' && b.role.toLowerCase() === 'hr') return -1;
                                                if (a.role.toLowerCase() === 'hr' && b.role.toLowerCase() === 'employee') return 1;
                                                return 0;
                                            })
                                            .map((emp) => ({
                                                value: emp.userId,
                                                label: `${capitalizeFirst(emp.name)} - (${capitalizeFirst(emp.role)})`,
                                            }))
                                        }
                                        value={projectData.employeeIds}
                                        onChange={(selectedOptions) => setProjectData({ ...projectData, employeeIds: selectedOptions || []})}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? "#86b7fe" : "#DDD",
                                                borderWidth: "0.1px",
                                                borderRadius: "0.375rem",
                                                boxShadow: "none",
                                                minHeight: "34px",
                                                border: "1px solid #e8ebf3",
                                                "&:hover": {
                                                    borderColor: "#86b7fe",
                                                },
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                margin: '2px',
                                            }),
                                        }}
                                        />
                                    </Col>
                                    
                                </Row>        

                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="startDate" 
                                                className="col-sm-2 col-form-label text-end"
                                            >Start Date <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="startDate"
                                                    type="date"
                                                    value={projectData.startDate}
                                                    onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="my-4">
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Form.Label 
                                                htmlFor="endDate" 
                                                className="col-sm-2 col-form-label text-end"
                                            >End Date <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    id="endDate"
                                                    type="date"
                                                    value={projectData.endDate}
                                                    onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group className="mb-3">
                                        <Row className="mb-3">						
                                            <Form.Label 
                                                htmlFor="status"
                                                className="col-sm-2 col-form-label text-end"
                                            >Status <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Select
                                                    id="status"
                                                    value={projectData.status}
                                                    onChange={(e) => setProjectData({ ...projectData, status: e.target.value })}
                                                >
                                                    <option value="">Select a status</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="active">In Progress</option>
                                                    <option value="notStarted">Not Started</option>
                                                    <option value="pending">Pending</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Row>

                                <Row className="d-flex justify-content-center mb-4">
									<div className="text-center">
										<button 
											type="reset" 
											className="btn btn-secondary me-2" 
										>
											Reset
										</button>
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

export default ProjectForm

