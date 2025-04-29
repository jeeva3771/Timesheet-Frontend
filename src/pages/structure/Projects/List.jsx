import React, { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import { useNavigate } from "react-router-dom"
import Modall from "../Modal.jsx"
import styles from "../App.module.css"
import { useAuthContext } from '@/context'
import clsx from "clsx"
import { 
  readProjects, 
  readProjectById, 
  deleteProjectById 
} from "../Api.js"
import { toast } from "sonner"
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'react-bootstrap'
import { successAndCatchErrorToastOptions, errorToastOptions } from "../utils.js/Toastoption.js"

const ReadProjectsList = () => {
  const { removeUserLogged } = useAuthContext()
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  // Pagination-related states
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0) // 0-based
  const [limit, setLimit] = useState(5)
  const [pageNo, setPageNo] = useState(1) // 1-based for API
  const totalPages = pageSize === -1 ? 1 : Math.ceil(projectCount / pageSize)

  const [sortColumn, setSortColumn] = useState("p.createdAt")
  const [sortOrder, setSortOrder] = useState("DESC")

  const defaultColumn = [
    { key: 'p.projectName', label: 'Project' },
    { key: 'p.clientName', label: 'Client Name' },
    { key: 'u2.name', label: 'Manager Name' },
    { key: 'ue.name', label: 'Employee allotted' },
    { key: 'p.startDate', label: 'Start Date' },
    { key: 'p.endDate', label: 'End Date' },
    { key: 'p.status', label: 'status' }
  ]

  const labels = {
    title: "Project Details",
    name: "Project",
    client: "Client Name",
    manager: "Manager Name",
    employees: "Employee Allotted",
    startDate: "Start Date",
    endDate: "End Date",
    status: "Status",
    createdAt: "Created At",
    createdName: "Created By",
    updatedAt: "Updated At",
    updatedName: "Updated By",
  }

  useEffect(() => {
    setPageNo(pageIndex + 1)
  }, [pageIndex])
  
  useEffect(() => {
    const currentLimit = pageSize === -1 ? projectCount : pageSize
    setLimit(currentLimit)
  }, [pageSize, projectCount])

  useEffect(() => {
    fetchProjects()
  }, [pageNo, limit, searchText, sortColumn, sortOrder])


  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "ASC" ? "DESC" : "ASC"
    setSortColumn(column)
    setSortOrder(newSortOrder)
    setPageIndex(0)
    setPageNo(1)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setProjectToDelete(null)
  }

  const openDeleteModal = (projectId) => {
    setProjectToDelete(projectId)
    setShowDeleteModal(true)
  }

  const fetchProjects = async () => {
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

      const { projects, projectCount } = await response.json()
      const updatedData = updatedProjects(projects)
      setProjects(updatedData)
      setProjectCount(projectCount || 0)

    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    } finally {
      setLoading(false)
    }
  }

  const handleReadProjectById = async (projectId) => {
    try {
      const { response, error } = await readProjectById(projectId)
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
        const project = await response.json()
        const [updatedData] = updatedProjects(project)
        setSelectedProject(updatedData)
        setShowModal(true)
      } else {
        toast.error(await response.json(), errorToastOptions)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    }
  }

  const confirmDeleteProject = async () => {
    try {
      if (!projectToDelete) return
      
      const { response, error } = await deleteProjectById(projectToDelete)
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
        toast.success('Successfully deleted.', successAndCatchErrorToastOptions)
        fetchProjects()
      } else {
        toast.error(await response.json(), errorToastOptions)
      }
      
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    } finally {
      handleCloseDeleteModal()
    }
  }

  const updatedProjects = (projects) => {
    const dateFields = ['createdTime', 'updatedTime', 'projectStart', 'projectEnd']

    return (projects || []).map(project => {
      const updatedUser = {}
      for (let key in project) {
        if (key === 'status' || dateFields.includes(key)) {
          updatedUser[key] = project[key] // Keep status as is
        } else if (typeof project[key] === 'string' && !dateFields.includes(key)) {
          updatedUser[key] = project[key]
            .split(',')
            .map(str => str.trim())
            .map(str => str.charAt(0).toUpperCase() + str.slice(1))
            .join(', ')
        } else {
          updatedUser[key] = project[key]
        }
      }
      return updatedUser
    })
  }
  

  return (
    <>
      <PageBreadcrumb title="Projects List" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="d-flex align-items-center">
                <label className="me-2 mb-0">Search:</label>
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={`${projectCount} records...`}
                  className="form-control w-auto"
                />
              </div>
              <div className="d-flex align-items-center gap-3">
                <span
                  className={`text-muted fs-6 ${styles.cursorPointer} ${styles.history}`}
                  onClick={() => navigate('/history/')}
                >
                  <i className="mdi mdi-history mdi-18px"></i> History
                </span>
                <button className="btn btn-primary" onClick={() => navigate('/projects/add/')}>
                  ADD
                </button>
              </div>
            </div>
              <div className="table-responsive mt-3">
                <table className={clsx('table table-centered react-table')}>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      {defaultColumn.map(({ key, label }) => (
                        <th key={key} onClick={() => handleSort(key)} className={styles.cursorPointer}>
                          {label}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                    ) : projects.length > 0 ? (
                        projects.map((project, index) => (
                        <tr key={index}>
                          <td>{(pageNo - 1) * limit + index + 1}</td>
                          <td>{project.projectName}</td>
                          <td>{project.clientName}</td>
                          <td>{project.managerName}</td>
                          <td>{project.assignedEmployees}</td>
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
                          <td>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => handleReadProjectById(project.projectId)}>
                              <i className="las la-info-circle text-secondary font-20" />
                            </button>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => navigate(`/projects/${project.projectId}/`)}> 
                              <i className="las la-pen text-secondary font-20" />
                            </button>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => openDeleteModal(project.projectId)}>
                              <i className="las la-trash-alt text-secondary font-20" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="8" className="text-center small">No results found.</td></tr>
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
                      const newSize = e.target.value === '-1' ? -1 : Number(e.target.value)
                      setPageSize(newSize)
                      setPageIndex(0)
                    }}
                    className="form-select d-inline-block w-auto"
                  >
                    {[5, 10, 20, 'All'].map((size) => (
                      <option key={size} value={size === 'All' ? -1 : size}>{size}</option>
                    ))}
                  </select>
                </div>

                {/* Page Info */}
                <span className="me-3">
                  Page <strong>{pageIndex + 1} of {totalPages}</strong>
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

                <ul className="pagination pagination-rounded d-inline-flex ms-auto align-items-center mb-0">
                  {/* Previous Button */}
                  <li
                    className={clsx("page-item", { disabled: pageIndex === 0 })}
                    onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}
                  >
                    <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                          strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
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
                        className={clsx("page-item", { active: pageIndex === pageNumber })}
                        onClick={() => setPageIndex(pageNumber)}
                      >
                        <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                          {pageNumber + 1}
                        </a>
                      </li>
                    )
                  })}

                  {/* Next Button */}
                  <li
                    className={clsx("page-item", { disabled: pageIndex === totalPages - 1 })}
                    onClick={() => pageIndex < totalPages - 1 && setPageIndex(pageIndex + 1)}
                  >
                    <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                          strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        centered
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader>
          <h6 className="modal-title m-0">Confirm Delete</h6>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseDeleteModal}
          />
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <i className="las la-exclamation-triangle text-warning display-4 mb-3"></i>
            <h4>Are you sure you want to delete this project?</h4>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProject}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>

      {/* Details Modal */}
      <Modall
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        data={selectedProject}
        labels={labels}
      />
    </>
  )
}

export default ReadProjectsList