import React, { useState, useEffect } from 'react'
import { PageBreadcrumb } from '@/components'
import styles from '../App.module.css'
import { useAuthContext } from '@/context'
import clsx from 'clsx'
import { readTimesheets, readProjectName, readTimeSheetDocumentById } from '../Api.js'
import { toast } from 'sonner'
import { Button, Card, CardBody, Col, Modal, Row, Spinner } from 'react-bootstrap'
import {
    successAndCatchErrorToastOptions,
    errorToastOptions,
} from '../utils.js/Toastoption.js'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import * as XLSX from 'xlsx'

// Spinner component for any loading state
const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="text-center my-4">
    <Spinner animation="border" role="status" variant="primary" />
    <p className="mt-2">{text}</p>
  </div>
)

// Excel Viewer Component - Simplified for specific formats
const ExcelViewer = ({ excelData }) => {
  const [activeSheet, setActiveSheet] = useState(excelData?.sheetNames?.[0] || '')
  
  if (!excelData || !excelData.sheetNames || excelData.sheetNames.length === 0) {
    return <div className="alert alert-warning">Unable to parse Excel file</div>
  }
  
  // Get the data for current sheet
  const getSheetData = () => {
    if (!activeSheet) return []
    const worksheet = excelData.workbook.Sheets[activeSheet]
    return XLSX.utils.sheet_to_json(worksheet, { header: 1 })
  }
  
  const sheetData = getSheetData()
  
  return (
    <div className="excel-viewer-container">
      {excelData.sheetNames.length > 1 && (
        <div className="sheet-selector mb-3">
          <label className="me-2">Sheet:</label>
          <select 
            className="form-select d-inline-block" 
            style={{ width: 'auto' }} 
            value={activeSheet}
            onChange={(e) => setActiveSheet(e.target.value)}
          >
            {excelData.sheetNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      )}
      
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <tbody>
            {sheetData.length > 0 ? (
              sheetData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.isArray(row) ? (
                    row.map((cell, cellIndex) => {
                      // Use th for header row
                      return rowIndex === 0 ? (
                        <th key={cellIndex} className="bg-light">{cell !== undefined ? cell : ''}</th>
                      ) : (
                        <td key={cellIndex}>{cell !== undefined ? cell : ''}</td>
                      );
                    })
                  ) : (
                    <td colSpan="100%">Invalid row data</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className="text-center">No data in this sheet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Main component
const ReadTimeSheetListUser = () => {
    const { removeUserLogged } = useAuthContext()
    const navigate = useNavigate()
    const [timesheets, setTimesheets] = useState([])
    // const [timeSheetCount, setTimeSheetCount] = useState(0)
    const [totalHoursWorked, setTotalHoursWorked] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedProject, setSelectedProject] = useState('')
    const [projectList, setProjectList] = useState([])
    // const [user, setUser] = useState(userInfo?.userId)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [reportImages, setReportImages] = useState({})
    // const [pageSize, setPageSize] = useState(10)
    // const [pageIndex, setPageIndex] = useState(0)
    // const [limit, setLimit] = useState(10)
    // const [pageNo, setPageNo] = useState(1)
    // const totalPages = pageSize === -1 ? 1 : Math.ceil(timeSheetCount / pageSize)
    const [sortColumn, setSortColumn] = useState('t.createdAt')
    const [sortOrder, setSortOrder] = useState('DESC')
    const [selectedImageId, setSelectedImageId] = useState(null)
    const [documentLoading, setDocumentLoading] = useState(false)
    const [downloadingId, setDownloadingId] = useState(null);
    

    const defaultColumn = [
        // { key: 'ur.name', label: 'Name' },
        { key: 'p.projectName', label: 'Project' },
        { key: 't.workDate', label: 'Date' },
        { key: 't.task', label: 'Task' },
        { key: 't.hoursWorked', label: 'Hour(s) Worked' },
    ]
  
    useEffect(() => {
        handleReadProjectName(true, true, false, undefined, true)
    }, [])

    // useEffect(() => {
    //     handleReadProjectName(true, true, false, user, true)
    //     // setPageIndex(0)
    //     // setPageNo(1)
    // }, [user])

    // useEffect(() => {
    //     setPageIndex(0)
    //     setPageNo(1)
    // }, [startDate, endDate])

    // useEffect(() => {
    //     setPageNo(pageIndex + 1)
    // }, [pageIndex])

    // useEffect(() => {
    //     const currentLimit = pageSize === -1 ? timeSheetCount : pageSize
    //     setLimit(currentLimit)
    // }, [pageSize, timeSheetCount])

    useEffect(() => {
        fetchTimesheet()
    }, [
        // pageNo,
        // limit,
        sortColumn,
        sortOrder,
        selectedProject,
        startDate,
        endDate,
    ])

    const handleSort = (column) => {
        const newSortOrder =
            sortColumn === column && sortOrder === 'ASC' ? 'DESC' : 'ASC'
        setSortColumn(column)
        setSortOrder(newSortOrder)
        // setPageIndex(0)
        // setPageNo(1)
    }

    const resetFilters = () => {
        setSelectedProject('')
        setStartDate('')
        setEndDate('')
        // setPageIndex(0)
        // setPageNo(1)
        setSortColumn('t.createdAt')
        setSortOrder('DESC')
        // if (pageSize !== 10) {
        //   setPageSize(10)
        // }
      }

    const parseExcelFile = async (blob) => {
        try {
            // Convert blob to array buffer
            const arrayBuffer = await blob.arrayBuffer()

            // Parse the excel file
            const workbook = XLSX.read(arrayBuffer, {
                type: 'array',
                cellStyles: true,
                cellDates: true
            })

            return {
                workbook,
                sheetNames: workbook.SheetNames
            }
        } catch (error) {
            return null
        }
    }

    const downloadDocument = async (timesheetId, userName) => {
        try {
            setDownloadingId(timesheetId)
        
            const { response, error } = await readTimeSheetDocumentById(timesheetId)
        
            if (error) {
                toast.error(error, errorToastOptions)
                return
            }
        
            if (response.status === 401) {
                removeUserLogged()
                navigate('/')
                return
            }
            
            // Get the content type and filename from headers
            const contentType = response.headers.get('Content-Type')
            const contentDisposition = response.headers.get('Content-Disposition')
            
            // Extract filename from Content-Disposition header or create a default one
            const cleanUsername = userName.replace(/[^a-zA-Z0-9]/g, '_')
    
            // Extract original filename or create default
            let filename = `${cleanUsername}_document_${timesheetId}`
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
                if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '')
                }
            } else {
                // Add appropriate extension based on content type
                if (contentType.includes('image/jpeg')) filename += '.jpg'
                else if (contentType.includes('image/png')) filename += '.png'
                else if (contentType.includes('application/pdf')) filename += '.pdf'
                else if (contentType.includes('application/vnd.ms-excel')) filename += '.xls'
                else if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) filename += '.xlsx'
            }
            
            // Create blob and download
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            
            toast.success('Document downloaded successfully', successAndCatchErrorToastOptions)
        } catch (error) {
            toast.error('Failed to download document', errorToastOptions)
        } finally {
            setDownloadingId(null)
        }
    }

    const handleDocument = async (blob, contentType, timesheetId) => {
        try {
            // Create a URL for the blob
            const objectUrl = URL.createObjectURL(blob)
            
            let excelData = null
            
            // If this is an Excel file, parse it
            if (contentType.includes('application/vnd.ms-excel') || 
                contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                excelData = await parseExcelFile(blob);
            }
        
            // Store information about the document
            setReportImages(prev => ({ 
                ...prev, 
                [timesheetId]: {
                url: objectUrl,
                type: contentType,
                excelData: excelData
                }
            }))
        } catch (error) {
            toast.error(
                'Something went wrong. Please try again later.',
                errorToastOptions
            )
        }
    }

    const fetchTimesheet = async () => {
        try {
            setLoading(true)
            const { response, error } = await readTimesheets(
                // limit,
                // pageNo,
                sortColumn,
                sortOrder,
                startDate,
                endDate,
                undefined,
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

            const { timesheets, totalAdjustedHoursWorked } = await response.json()
            const updatedData = reportUpdateData(timesheets)

            setTimesheets(updatedData)
            setTotalHoursWorked(totalAdjustedHoursWorked)
            // setTimeSheetCount(totalTimesheetCount || 0)

            // Process each timesheet document separately
            await Promise.all(timesheets.map(async (timesheet) => {
                if (timesheet.documentImage) {  // Only fetch if document exists
                    try {
                        const { response, error } = await readTimeSheetDocumentById(timesheet.timesheetId)
                        
                        if (error) {
                            toast.error(error, errorToastOptions)
                            return
                        }
            
                        if (response.status === 401) {
                            removeUserLogged()
                            navigate('/')
                            return
                        }
                        
                        // Read the Content-Type header from the response
                        const contentType = response.headers.get('Content-Type')
                        
                        // Create a blob from the response with the correct content type
                        const blob = await response.blob()
                        
                        // Handle the document based on its content type
                        handleDocument(blob, contentType, timesheet.timesheetId)
                    } catch (err) {
                        toast.error(
                            'Something went wrong. Please try again later.',
                            successAndCatchErrorToastOptions
                        )
                    }
                }
            }))
        } catch (error) {
            toast.error(
                'Something went wrong. Please try again later.',
                successAndCatchErrorToastOptions
            )
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
                        timesheet[key].slice(1)
                } else {
                    updatedUser[key] = timesheet[key]
                }
            }

            return updatedUser
        })
    }  

    const handleViewDocument = (timesheetId) => {
        setSelectedImageId(timesheetId)
        setDocumentLoading(true)
        setShowModal(true)
        
        // If document was already loaded, hide spinner after a short delay
        if (reportImages[timesheetId]) {
            setTimeout(() => {
                setDocumentLoading(false)
            }, 500)
        } else {
            // Document not loaded yet - spinner will be hidden when document is loaded
            setDocumentLoading(true)
        }
    }

    // Effect to handle document loading completion
    useEffect(() => {
        if (selectedImageId && reportImages[selectedImageId]) {
            setDocumentLoading(false)
        }
    }, [selectedImageId, reportImages])
    

    return (
        <>
            <PageBreadcrumb title="Time Sheets List" />
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <Row className="mb-3"> 								
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Select Project</Form.Label>
                                        <Form.Select
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}>
                                            <option value="">All</option>
                                            {projectList.length > 0 ? (
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
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
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
                                        onClick={resetFilters}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                            <div className="table-responsive mt-3">
                                <table className={clsx('table table-centered react-table table-striped')}>
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            {defaultColumn?.map(({ key, label }) => (
                                                <th
                                                    key={key}
                                                    onClick={() => handleSort(key)}
                                                    className={styles.cursorPointer}
                                                    
                                                >
                                                    {label}
                                                    {sortColumn === key && (
                                                        <span className={`ms-2 fas ${sortOrder === 'ASC' ? 'fa-sort-up' : 'fa-sort-down'}`}></span>
                                                    )}
                                                </th>
                                            ))}
                                            <th>Documents</th>
                                            <th>Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                                        ) : timesheets.length > 0 ? (
                                            timesheets.map((timesheet, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    {/* <td>{timesheet.name}</td> */}
                                                    <td>
                                                        {timesheet.projectName
                                                        .replace(/\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, '') // remove date part
                                                        .replace(/-\s*$/, '') // remove last hyphen (with optional space)
                                                        .trim() // clean up trailing space if any
                                                        }
                                                    </td>
                                                    <td>{timesheet.workedDate}</td>
                                                    <td className='whitespace-pre-wrap'>{timesheet.task}</td>
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
                                                        {reportImages[timesheet.timesheetId] ? (
                                                            <Button
                                                                variant="link"
                                                                className="text-primary p-0"
                                                                style={{ textDecoration: 'none' }}
                                                                onClick={() => handleViewDocument(timesheet.timesheetId)}>
                                                                View
                                                            </Button>
                                                        ) : (
                                                            <span>No Document</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {reportImages[timesheet.timesheetId] ? (
                                                            <Button
                                                            variant="link"
                                                            className="text-success p-0"
                                                            style={{ textDecoration: 'none' }}
                                                            onClick={() => downloadDocument(timesheet.timesheetId, timesheet.name)}
                                                            disabled={downloadingId === timesheet.timesheetId}
                                                          >
                                                            {downloadingId === timesheet.timesheetId ? (
                                                              <Spinner animation="border" size="sm" />
                                                            ) : (
                                                              <i className="fas fa-download"></i>
                                                            )}
                                                          </Button>
                                                            
                                                        ) : (<h>u</h>)}
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

                            {/* <div className="d-lg-flex align-items-center text-center pb-1 mt-3">
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
                                        className="form-select d-inline-block w-auto"
                                    >
                                        {[10, 20, 50, 'All'].map((size) => (
                                            <option key={size} value={size === 'All' ? -1 : size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <span className="me-3">
                                    Page{' '}
                                    <strong>
                                        {pageIndex + 1} of {totalPages}
                                    </strong>
                                </span>

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
                                </div> */}
                                <div className="d-flex justify-content-end mt-3">
                                    {(selectedProject) && (
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
                                </div>

                                {/* <ul className="pagination pagination-rounded d-inline-flex ms-auto align-items-center mb-0">
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
                                </ul> */}
                            {/* </div> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Document Viewer Modal - With Spinner */}
            <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Document View</Modal.Title>
                </Modal.Header>
                <Modal.Body className="document-viewer-modal">
                    {documentLoading ? (
                        <LoadingSpinner text="Loading document..." />
                    ) : selectedImageId && reportImages[selectedImageId] ? (
                        (() => {
                            const fileData = reportImages[selectedImageId];
                            const contentType = fileData.type || '';
                            
                            // Handle specific file types as requested
                            if (contentType.includes('image/jpeg') || 
                                contentType.includes('image/png') || 
                                contentType.includes('image/jpg')) {
                                // Images
                                return (
                                    <div className="text-center">
                                        <img
                                            src={fileData.url}
                                            alt="Document"
                                            className={`${styles.viewPort} ${styles.heightAuto} ${styles.maxHeight}`}
                                        />
                                    </div>
                                )
                            } else if (contentType.includes('application/vnd.ms-excel') || 
                                    contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                                // Excel files
                                return fileData.excelData ? (
                                    <div className="p-3">
                                        <ExcelViewer 
                                            excelData={fileData.excelData}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-4 text-center">
                                        <p>This Excel file cannot be displayed in the browser.</p>
                                        <a href={fileData.url} download className="btn btn-primary">
                                            Download Excel File
                                        </a>
                                    </div>
                                )
                            } else if (contentType.includes('application/pdf')) {
                                // PDF files
                                return (
                                    <iframe
                                        src={fileData.url}
                                        title="PDF Viewer"
                                        className={`${styles.viewPort} w-100 ${styles.maxHeight}`}
                                    />
                                )
                            } else {
                                // For other file types, offer a download link
                                return (
                                    <div className="text-center p-5">
                                        <p>
                                            This file type ({contentType}) cannot be displayed directly in the browser.
                                        </p>
                                        <a href={fileData.url} download className="btn btn-primary">
                                            Download File
                                        </a>
                                    </div>
                                )
                            }
                        })()
                    ) : (
                        <div className="text-center p-5">
                            <p>No document available.</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedImageId && reportImages[selectedImageId] && (
                        <Button 
                            variant="primary" 
                            onClick={() => {
                                // Find the timesheet to get the username
                                const timesheet = timesheets.find(t => t.timesheetId === selectedImageId)
                                if (timesheet) {
                                    downloadDocument(selectedImageId, timesheet.name)
                                }
                            }}
                            className="me-2"
                        >
                        <i className="fas fa-download me-1"></i>
                        Download
                        </Button>
                    )}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReadTimeSheetListUser