import React, { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import user from "../../../assets/images/users/user-1.jpg"
import Modal from "../Modal.jsx"
import styles from "../App.module.css"
import { useAuthContext } from '@/context'
import {
  Card,
  CardBody,
  Col,
  Row,
} from "react-bootstrap"
import { Table } from "@/components"
import clsx from "clsx"
import { readUsers } from "../Api"
import { toast } from "sonner"

const apiUrl = import.meta.env.VITE_API_URL

const ReadUsersList = () => {
  const { removeUserLogged } = useAuthContext()
  const navigate = useNavigate()

  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [usersImages, setUserImages] = useState({})
  const [userCount, setUserCount] = useState(0)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)

  // Pagination-related states
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0) // 0-based
  const [limit, setLimit] = useState(5)
  const [pageNo, setPageNo] = useState(1) // 1-based for API
  const totalPages = pageSize === -1 ? 1 : Math.ceil(userCount / pageSize)

  const [sortColumn, setSortColumn] = useState("u.createdAt")
  const [sortOrder, setSortOrder] = useState("DESC")

  const defaultColumn = [
    { key: 'u.name', label: 'Name' },
    { key: 'u.emailId', label: 'Email' },
    { key: 'u.role', label: 'Role' },
    { key: 'u.status', label: 'Status' },
    { key: 'ur.name', label: 'Created By' }
  ]

  const labels = {
    title: "User Details",
    name: "Name",
    dob: "Date of Birth",
    email: "Email",
    role: "Role",
    status: "Status",
    createdAt: "Created At",
    createdBy: "Created By",
    updatedAt: "Updated At",
    updatedBy: "Updated By",
  }

  // Sync limit/pageNo whenever pagination states change
  useEffect(() => {
    setLimit(pageSize === -1 ? userCount : pageSize)    
    setPageNo(pageIndex + 1)
  }, [pageIndex, pageSize])

  useEffect(() => {
    fetchUsers()
  }, [pageNo, limit, searchText, sortColumn, sortOrder])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { response, error } = await readUsers(limit, pageNo, sortColumn, sortOrder, searchText || '')

      if (error) {
        alert(error)
        return
      }

      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      const { users, userCount } = await response.json()

      const updatedUsers = (users || []).map(user => {
        const updatedUser = {}
        for (let key in user) {
          if (key === 'emailId' || key === 'status') {
            updatedUser[key] = user[key]
          } else if (typeof user[key] === 'string') {
            updatedUser[key] = user[key].charAt(0).toUpperCase() + user[key].slice(1).toLowerCase()
          } else {
            updatedUser[key] = user[key]
          }
        }
        updatedUser.status = user.status === 1 ? 'Active' : ''
        return updatedUser
      })

      setUsers(updatedUsers)
      setUserCount(userCount || 0)

      const images = {}
      users.forEach(user => {
        images[user.userId] = `${apiUrl}/api/users/avatar/${user.userId}/`
      })
      setUserImages(images)

    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-right',
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "ASC" ? "DESC" : "ASC"
    setSortColumn(column)
    setSortOrder(newSortOrder)
  }

  const handleShowModal = (userData) => {
    setSelectedUser(userData)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  return (
    <>
      <PageBreadcrumb title="Users List" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <span className="d-flex align-items-center">
                  Search :{' '}
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={`${userCount} records...`}
                    className="form-control w-auto ms-1"
                  />
                </span>
                <div className="ms-auto">
                  <button className="btn btn-primary" onClick={() => navigate('/users/add/')}>ADD</button>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className={clsx('table table-centered react-table')}>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Profile</th>
                      {defaultColumn.map(({ key, label }) => (
                        <th key={key} onClick={() => handleSort(key)} className={styles.cursorPointer}>
                          {label}
                          {/* {sortColumn === key ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""} */}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                    ) : users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{(pageNo - 1) * limit + index + 1}</td>
                          <td>
                            <img
                              src={usersImages[user.userId] || user}
                              alt="Profile"
                              className={`me-2 rounded-0 ${styles.imageSizing}`}
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>{user.emailId}</td>
                          <td>{user.role}</td>
                          <td>
                            {user.status === 'Active' && (
                              <span className="badge badge-md badge-boxed badge-soft-success">
                                {user.status}
                              </span>
                            )}
                          </td>
                          <td>{user.createdName}</td>
                          <td>
                            <Link to="#"><i className="las la-info-circle text-secondary font-20" /></Link>
                            <Link to="#"><i className="las la-pen text-secondary font-20" /></Link>
                            <Link to="#"><i className="las la-trash-alt text-secondary font-20" /></Link>
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

  <Modal
    showModal={showModal}
    handleCloseModal={handleCloseModal}
    selectedUser={selectedUser}
    labels={labels}
  />
</>
)
}

export default ReadUsersList
