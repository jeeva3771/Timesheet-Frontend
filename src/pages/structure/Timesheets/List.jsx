// import { useState } from "react"
// import { PageBreadcrumb } from "@/components"
// import { Card, CardBody, Col, Row, Button, Form, Modal } from "react-bootstrap"
// import { Table } from "@/components"
// import { customersDetails } from "./data"
// import user from "../../../assets/images/document.png"
// import styles from "../App.module.css"

// const DataTables = () => {
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [selectedPerson, setSelectedPerson] = useState("");
//   const [selectedProject, setSelectedProject] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [documentUrl, setDocumentUrl] = useState("");

//   const handleViewDocument = (url) => {
//     setDocumentUrl(url);
//     setShowModal(true);
//   };

//   const filteredData = customersDetails.filter((item) => {
//     const personMatch = selectedPerson ? item.name === selectedPerson : true;
//     const projectMatch = selectedProject ? item.project === selectedProject : true;
//     const dateMatch =
//       (!startDate || new Date(item.date) >= new Date(startDate)) &&
//       (!endDate || new Date(item.date) <= new Date(endDate));
//     return personMatch && projectMatch && dateMatch;
//   });

//   const columns = [
//     { Header: "S. No.", accessor: "id", defaultCanSort: true },
//     { Header: "Name", accessor: "name", defaultCanSort: true },
//     { Header: "Project", accessor: "project", defaultCanSort: true },
//     { Header: "Date", accessor: "date", defaultCanSort: true },
//     { Header: "Task", accessor: "task", defaultCanSort: true },
//     { Header: "Hour(s) Worked", accessor: "hours", defaultCanSort: true },
//     {
//       Header: "Documents",
//       accessor: "document",
//       defaultCanSort: false,
//       Cell: ({ value }) =>
//         value ? (
//           <Button variant="link" className="text-primary"  style={{ textDecoration: "none" }} onClick={() => handleViewDocument(value)}>
//             View
//           </Button>
//         ) : (
//           "No Document"
//         ),
//     },
//   ];

//   return (
//     <>
//       <PageBreadcrumb title="Time Sheets List" />
//       <Row>
//         <Col xs="12">
//           <Card>
//             <CardBody>
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Select Person</Form.Label>
//                     <Form.Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
//                       <option value="">All</option>
//                       {[...new Set(customersDetails.map((item) => item.name))].map((name) => (
//                         <option key={name} value={name}>
//                           {name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Select Project</Form.Label>
//                     <Form.Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
//                       <option value="">All</option>
//                       {[...new Set(customersDetails.map((item) => item.project))].map((project) => (
//                         <option key={project} value={project}>
//                           {project}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>Start Date</Form.Label>
//                     <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>End Date</Form.Label>
//                     <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col md={2} className="d-flex align-items-end" >
//                   <Button
//                     variant="danger"
//                     onClick={() => {
//                       setSelectedPerson("")
//                       setSelectedProject("")
//                       setStartDate("")
//                       setEndDate("")
//                     }}
//                   >
//                     Reset
//                   </Button>
//                 </Col>
//               </Row>

//               <Table
//                 columns={columns}
//                 data={filteredData}
//                 pageSize={5}
//                 sizePerPageList={[
//                   { text: "5", value: 5 },
//                   { text: "10", value: 10 },
//                   { text: "25", value: 25 },
//                   { text: "All", value: customersDetails.length },
//                 ]}
//                 isSortable={true}
//                 pagination={true}
//                 isSearchable={false}
//                 selectPerson={selectedPerson.length > 0}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>

//       {/* Fullscreen Modal for Viewing Documents */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
//         <Modal.Header closeButton>
//           <Modal.Title>Document View</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {user ? (
//             user.endsWith(".pdf") ? (
//               <iframe src={user} className={`${styles.wid-100} ${styles.viewPort}`}/>
//             ) : (
//               <img src={user} alt="Document" className={`${styles.viewPort} ${styles.heightAuto}`}/>
//             )
//           ) : (
//             <p>No document available</p>
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

// export default DataTables

import React, { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import Modall from "../Modal.jsx"
import styles from "../App.module.css"
import { useAuthContext } from '@/context'
import clsx from "clsx"
import { 
  readTimesheets,
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
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap"

const ReadTimeSheetList = () => {
  const { removeUserLogged } = useAuthContext()
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [timeSheets, setTimesheets] = useState([])
  const [timeSheetCount, setTimeSheetCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)

  // Pagination-related states
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0) // 0-based
  const [limit, setLimit] = useState(5)
  const [pageNo, setPageNo] = useState(1) // 1-based for API
  const totalPages = pageSize === -1 ? 1 : Math.ceil(timeSheetCount / pageSize)

  const [sortColumn, setSortColumn] = useState("t.createdAt")
  const [sortOrder, setSortOrder] = useState("DESC")

  const defaultColumn = [
    { key: 'ur.name', label: 'Name' },
    { key: 'p.projectName', label: 'Project' },
    { key: 't.date', label: 'Date' },
    { key: 't.task', label: 'Task' },
    { key: 't.hoursWorked', label: 'Hour(s) Worked' }
  ]

  // const labels = {
  //   title: "Project Details",
  //   name: "Project",
  //   client: "Client Name",
  //   manager: "Manager Name",
  //   employees: "Employee Allotted",
  //   startDate: "Start Date",
  //   endDate: "End Date",
  //   status: "Status",
  //   createdAt: "Created At",
  //   createdName: "Created By",
  //   updatedAt: "Updated At",
  //   updatedName: "Updated By",
  // }

  useEffect(() => {
    setPageNo(pageIndex + 1)
  }, [pageIndex])
  
  useEffect(() => {
    const currentLimit = pageSize === -1 ? timeSheetCount : pageSize
    setLimit(currentLimit)
  }, [pageSize, timeSheetCount])

  useEffect(() => {
    fetchTimesheet()
  }, [pageNo, limit, sortColumn, sortOrder])


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

  const fetchTimesheet = async () => {
    try {
      setLoading(true)
      const { response, error } = await readTimesheets(limit, pageNo, sortColumn, sortOrder)

      if (error) {
        toast.error(error, successAndCatchErrorToastOptions)
        return
      }

      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      const { timesheets, totalTimesheetCount,  totalAdjustedHoursWorked } = await response.json()
      // const updatedData = updatedProjects(projects)
      setTimesheets(timesheets)
      setTimeSheetCount(totalTimesheetCount || 0)

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    } finally {
      setLoading(false)
    }
  }

  // const handleReadProjectById = async (projectId) => {
  //   try {
  //     const { response, error } = await readProjectById(projectId)
  //     if (error) {
  //       toast.error(error, successAndCatchErrorToastOptions)
  //       return
  //     }  
      
  //     if (response.status === 401) {
  //       removeUserLogged()
  //       navigate('/')
  //       return
  //     }

  //     if (response.ok) {
  //       const project = await response.json()
  //       const [updatedData] = updatedProjects(project)
  //       setSelectedProject(updatedData)
  //       setShowModal(true)
  //     } else {
  //       toast.error(await response.json(), successAndCatchErrorToastOptions)
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
  //   }
  // }

  // const updatedProjects = (projects) => {
  //   const dateFields = ['createdTime', 'updatedTime', 'projectStart', 'projectEnd']

  //   return (projects || []).map(project => {
  //     const updatedUser = {}
  //     for (let key in project) {
  //       if (key === 'status' || dateFields.includes(key)) {
  //         updatedUser[key] = project[key] // Keep status as is
  //       } else if (typeof project[key] === 'string' && !dateFields.includes(key)) {
  //         updatedUser[key] = project[key]
  //           .split(',')
  //           .map(str => str.trim())
  //           .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
  //           .join(', ')
  //       } else {
  //         updatedUser[key] = project[key]
  //       }
  //     }
  //     return updatedUser
  //   })
  // }
  

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
                    <Form.Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
                     <option value="">All</option>
                     {/* {[...new Set(customersDetails.map((item) => item.name))].map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))} */}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                      <option value="">All</option>
                      {/* {[...new Set(customersDetails.map((item) => item.project))].map((project) => (
                        <option key={project} value={project}>
                          {project}
                        </option>
                      ))} */}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end" >
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedPerson("")
                      setSelectedProject("")
                      setStartDate("")
                      setEndDate("")
                    }}
                  >
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
                        <th key={key} onClick={() => handleSort(key)} className={styles.cursorPointer}>
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                    ) : timeSheets.length > 0 ? (
                        timeSheets.map((timeSheet, index) => (
                        <tr key={index}>
                          <td>{(pageNo - 1) * limit + index + 1}</td>
                          <td>{timeSheet.name}</td>
                          <td>{timeSheet.projectName}</td>
                          <td>{timeSheet.workedDate}</td>
                          <td>{timeSheet.task}</td>
                          <td>{timeSheet.hoursWorked}</td>
                          <td>Documents</td>
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

      {/* Details Modal */}
      {/* <Modall
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        data={selectedProject}
        labels={labels}
      /> */}
    </>
  )
}

export default ReadTimeSheetList