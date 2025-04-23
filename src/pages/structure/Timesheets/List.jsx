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
import styles from "../App.module.css"
import { useAuthContext } from '@/context'
import clsx from "clsx"
import {
 readTimesheets,
 readUserNameAndRole,
 readProjectName
} from "../Api.js"
import { toast } from "sonner"
import {
 Button,
 Card,
 CardBody,
 Col,
 Modal,
 Row,
} from 'react-bootstrap'
import { successAndCatchErrorToastOptions, errorToastOptions } from "../utils.js/Toastoption.js"
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap"
import { capitalizeFirst } from "../utils.js/util.js"
const apiUrl = import.meta.env.VITE_API_URL

const ReadTimeSheetList = () => {
 const { removeUserLogged } = useAuthContext()
 const navigate = useNavigate()
 const [timesheets, setTimesheets] = useState([])
 const [timeSheetCount, setTimeSheetCount] = useState(0)
 const [loading, setLoading] = useState(false)
 const [selectedProject, setSelectedProject] = useState("")
 const [projectList, setProjectList] = useState([])
 const [selectedPerson, setSelectedPerson] = useState("")
 const [userList, setUserList] = useState([])
 const [startDate, setStartDate] = useState("")
 const [endDate, setEndDate] = useState("")
 const [showModal, setShowModal] = useState(false)
 const [reportImage, setReportImages] = useState({})
 const [pageSize, setPageSize] = useState(10)
 const [pageIndex, setPageIndex] = useState(0)
 const [limit, setLimit] = useState(10)
 const [pageNo, setPageNo] = useState(1)
 const totalPages = pageSize === -1 ? 1 : Math.ceil(timeSheetCount / pageSize)
 const [sortColumn, setSortColumn] = useState("t.createdAt")
 const [sortOrder, setSortOrder] = useState("DESC")
 const [selectedImageId, setSelectedImageId] = useState(null)

 const defaultColumn = [
 { key: 'ur.name', label: 'Name' },
 { key: 'p.projectName', label: 'Project' },
 { key: 't.workDate', label: 'Date' },
 { key: 't.task', label: 'Task' },
 { key: 't.hoursWorked', label: 'Hour(s) Worked' }
 ]

 useEffect(() => {
 handleReadUserNameAndRole()
 // Initial call to fetch all projects
 handleReadProjectName();
 }, [])

 useEffect(() => {
 setPageNo(pageIndex + 1)
 }, [pageIndex])

 useEffect(() => {
 const currentLimit = pageSize === -1 ? timeSheetCount : pageSize
 setLimit(currentLimit)
 }, [pageSize, timeSheetCount])

 useEffect(() => {
 fetchTimesheet()
 }, [pageNo, limit, sortColumn, sortOrder, selectedPerson, selectedProject, startDate, endDate])

 const handleSort = (column) => {
 const newSortOrder = sortColumn === column && sortOrder === "ASC" ? "DESC" : "ASC"
 setSortColumn(column)
 setSortOrder(newSortOrder)
 setPageIndex(0)
 setPageNo(1)
 }

 const fetchTimesheet = async () => {
 try {
 setLoading(true)
 const { response, error } = await readTimesheets(
 limit, pageNo, sortColumn, sortOrder, startDate,
 endDate, selectedPerson, selectedProject)

 if (error) {
 toast.error(error, successAndCatchErrorToastOptions)
 return
 }

 if (response.status === 401) {
 removeUserLogged()
 navigate('/')
 return
 }

 const { timesheets, totalTimesheetCount } = await response.json()
 const updatedData = reportUpdateData(timesheets)

 setTimesheets(updatedData)
 setTimeSheetCount(totalTimesheetCount || 0)

 const docImage = {}
 timesheets.forEach(timesheet => {
 docImage[timesheet.timesheetId] = `<span class="math-inline">\{apiUrl\}/api/timesheets/documentimage/</span>{timesheet.timesheetId}/?t=${Date.now()}`
 })
 setReportImages(docImage)
 } catch (error) {
 toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
 } finally {
 setLoading(false)
 }
 }

 const handleReadUserNameAndRole = async () => {
 try {
 const { response, error } = await readUserNameAndRole()
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
 setUserList(userInfo)
 }
 } catch (error) {
 toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
 }
 }

 const handleReadProjectName = async (hrOnly = false) => { // Added hrOnly parameter
 try {
 const { response, error } = await readProjectName(true, true, hrOnly) // Pass hrOnly to API

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
 const projectInfo = await response.json()
 setProjectList(projectInfo)
 }
 } catch (error) {
 toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
 }
 }

 const reportUpdateData = (timesheets) => {
 const defaultValue = ['hoursWorked', 'workedDate']

 return (timesheets || []).map(timesheet => {
 const updatedUser = {}

 for (let key in timesheet) {
 if (defaultValue.includes(key)) {
 updatedUser[key] = timesheet[key]
 } else if (typeof timesheet[key] === 'string') {
 updatedUser[key] = timesheet[key].charAt(0).toUpperCase() + timesheet[key].slice(1).toLowerCase()
 } else {
 updatedUser[key] = timesheet[key]
 }
 }

 return updatedUser
 })
 }

 const handleViewDocument = (timesheetId, url) => {
 setSelectedImageId(timesheetId)
 setReportImages(prev => ({ ...prev, [timesheetId]: url }))
 setShowModal(true)

 console.log("Selected Image ID:", timesheetId)
 console.log("Image src:", url)
 }

 // onChange handler for the "Select Person" dropdown
 const handlePersonChange = (e) => {
 const personName = e.target.value;
 setSelectedPerson(personName);

 // Check if the selected person is HR
 const isHR = userList.find(user => user.name === personName)?.role.toLowerCase() === 'hr';

 // If HR is selected, fetch projects with hrOnly = true
 if (isHR) {
 handleReadProjectName(true);
 } else {
 // Otherwise, fetch all projects
 handleReadProjectName();
 }
 };

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
                     {userList
                      .sort((a, b) => {
                        if (a.role.toLowerCase() === 'employee' && b.role.toLowerCase() === 'hr') return -1
                        if (a.role.toLowerCase() === 'hr' && b.role.toLowerCase() === 'employee') return 1
                        return 0
                      })
                      .map((emp) => (
                        <option key={emp.userId} value={emp.name}>
                          {capitalizeFirst(emp.name)} - ({capitalizeFirst(emp.role)})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                      <option value="">All</option>
                      {projectList.map((project) => (
                        <option key={project.projectName} value={project.projectName}>
                          {capitalizeFirst(project.projectName)}
                        </option>
                      ))}
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
                      <th>Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                    ) : timesheets.length > 0 ? (
                        timesheets.map((timesheet, index) => (
                        <tr key={index}>
                          <td>{(pageNo - 1) * limit + index + 1}</td>
                          <td>{timesheet.name}</td>
                          <td>{timesheet.projectName}</td>
                          <td>{timesheet.workedDate}</td>
                          <td>{timesheet.task}</td>
                          <td>{parseFloat(timesheet.hoursWorked) % 1 === 0 ? parseInt(timesheet.hoursWorked) : timesheet.hoursWorked}</td>
                          <td>
                            {reportImage[timesheet.timesheetId] ? (
                              <Button variant="link" className="text-primary"  style={{ textDecoration: "none" }}
                                onClick={() => handleViewDocument(timesheet.timesheetId, reportImage[timesheet.timesheetId])}
                              >
                                View
                              </Button>
                            ) : (
                              <span>No Document</span>
                            )}
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
                    {[10, 20, 50, 'All'].map((size) => (
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
      <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Document View</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        {selectedImageId && reportImage[selectedImageId] ? (
          (() => {
            const fileUrl = reportImage[selectedImageId]
            const fileExtension = fileUrl.split('.').pop().toLowerCase()
            const isDocument = ['pdf', 'xls', 'xlsx', 'csv'].includes(fileExtension)
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
            );
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