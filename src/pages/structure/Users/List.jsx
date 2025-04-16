// import React, { useState, useEffect } from "react";
// import { PageBreadcrumb } from "@/components";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from '@/context';
// import { Card, CardBody, Col, Row, FormControl, Button, Pagination } from "react-bootstrap";
// import DataTable from 'react-data-table-component';
// import { readUsers, readUserById } from "../Api";
// import { toast } from "sonner";
// import styles from "../App.module.css";

// const apiUrl = import.meta.env.VITE_API_URL;

// interface UserData {
//   userId: string;
//   name: string;
//   emailId: string;
//   role: string;
//   createdName: string;
//   status: number;
// }

// const ReadUsersList = () => {
//   const { removeUserLogged } = useAuthContext();
//   const navigate = useNavigate();

//   const [items, setItems] = useState<UserData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalRows, setTotalRows] = useState(0);
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');

//   const columns = [
//     {
//       name: 'S. No.',
//       selector: (row: UserData, index: number) => index + 1 + (page - 1) * perPage,
//       sortable: false,
//       width: '60px'
//     },
//     {
//       name: 'Profile',
//       selector: (row: UserData) => row.name,
//       sortable: false,
//       width: '60px',
//       cell: (row: UserData) => (
//         <div className="flex items-center justify-center w-full">
//           <img
//             src={`${apiUrl}/api/users/avatar/${row.userId}`}
//             alt={row.name}
//             className={`me-2 rounded-0 ${styles.imageSizing}`}
//           />
//         </div>
//       )
//     },
//     {
//       name: 'Name',
//       selector: (row: UserData) => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: (row: UserData) => row.emailId,
//       sortable: true,
//     },
//     {
//       name: 'Role',
//       selector: (row: UserData) => row.role,
//       sortable: true,
//     },
//     {
//       name: 'Created By',
//       selector: (row: UserData) => row.createdName,
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: (row: UserData) => row.status,
//       sortable: true,
//       cell: (row: UserData) => (
//         <span className={`px-2 py-1 rounded-full text-sm ${row.status === 1 ? 'bg-success text-white' : 'bg-danger text-white'}`}>
//           {row.status === 1 ? 'Active' : 'Inactive'}
//         </span>
//       )
//     },
//     {
//       name: 'Action',
//       sortable: false,
//       cell: (row: UserData) => (
//         <div className="d-flex">
//           <Button variant="info" size="sm" onClick={() => handleReadUserById(row.userId)}>
//             <i className="las la-info-circle" />
//           </Button>
//           <Button variant="warning" size="sm" className="ms-2">
//             <i className="las la-pen" />
//           </Button>
//           <Button variant="danger" size="sm" className="ms-2">
//             <i className="las la-trash-alt" />
//           </Button>
//         </div>
//       )
//     }
//   ];

//   const fetchData = async (currentPage: number = page) => {
//     try {
//       const params = new URLSearchParams({
//         page: currentPage.toString(),
//         limit: perPage.toString(),
//       });

//       if (searchQuery) {
//         params.append('search', searchQuery);
//       }

//       const response = await fetch(`${apiUrl}/api/users?${params}`, { credentials: 'include' });
//       const result = await response.json();

//       if (result.users) {
//         setItems(result.users);
//         setTotalRows(result.userCount);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, perPage, searchQuery]);

//   const handleSort = (column: any, sortDirection: string) => {
//     setLoading(true);
//     fetchData();
//   };

//   const handlePageChange = (page: number) => {
//     setPage(page);
//   };

//   const handlePerRowsChange = (newPerPage: number, page: number) => {
//     setPerPage(newPerPage);
//     setPage(page);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setPage(1); // Reset to first page when searching
//   };

//   return (
//     <div className="min-h-screen bg-light p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>
//         <div className="bg-white rounded-lg shadow-md">
//           <div className="p-4 border-bottom">
//             <FormControl
//               type="text"
//               placeholder="Search users..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full max-w-md"
//             />
//           </div>
//           <DataTable className="table mb-0 table-centered"
//             columns={columns}
//             data={items}
//             progressPending={loading}
//             pagination
//             paginationServer
//             paginationTotalRows={totalRows}
//             onChangePage={handlePageChange}
//             onChangeRowsPerPage={handlePerRowsChange}
//             highlightOnHover
//             responsive
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadUsersList;


import React, { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import { useNavigate } from "react-router-dom"
import Modall from "../Modal.jsx"
import styles from "../App.module.css"
import { useAuthContext } from '@/context'
import clsx from "clsx"
import { 
  readUsers, 
  readUserById, 
  deleteUserById 
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
import { successAndCatchErrorToastOptions } from "../utils.js/Toastoption.js"

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
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

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
    createdName: "Created By",
    updatedAt: "Updated At",
    updatedName: "Updated By",
  }

  useEffect(() => {
    setPageNo(pageIndex + 1)
  }, [pageIndex])
  
  useEffect(() => {
    const currentLimit = pageSize === -1 ? userCount : pageSize
    setLimit(currentLimit)
  }, [pageSize, userCount])

  useEffect(() => {
    fetchUsers()
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
    setSelectedUser(null)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const openDeleteModal = (userId) => {
    setUserToDelete(userId)
    setShowDeleteModal(true)
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { response, error } = await readUsers(limit, pageNo, sortColumn, sortOrder, searchText || '')

      if (error) {
        toast.error(error, successAndCatchErrorToastOptions)
        return
      }

      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      const { users, userCount } = await response.json()

      const updatedData = updatedUsers(users)
      setUsers(updatedData)
      setUserCount(userCount || 0)

      const images = {}
      users.forEach(user => {
        images[user.userId] = `${apiUrl}/api/users/avatar/${user.userId}/?t=${Date.now()}`
      })
      setUserImages(images)

    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    } finally {
      setLoading(false)
    }
  }

  const handleReadUserById = async (userId) => {
    try {
      const { response, error } = await readUserById(userId)
      if (error) {
        toast.error(error)
        return
      }  
      
      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      if (response.ok) {
        const user = await response.json()
        const [updatedData] = updatedUsers(user)
        updatedData.image = `${apiUrl}/api/users/avatar/${updatedData.userId}/`
        setSelectedUser(updatedData)
        setShowModal(true)        
      } else {
        toast.error(await response.json())
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    }
  }

  const confirmDeleteUser = async () => {
    try {
      if (!userToDelete) return
      
      const { response, error } = await deleteUserById(userToDelete)
      if (error) {
        toast.error(error, {
          position: 'top-right',
          duration: 2000,
        })
        return
      }

      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }
      
      if (response.ok) {
        toast.success('Successfully deleted!', successAndCatchErrorToastOptions)
        fetchUsers()
      } else {
        toast.error(await response.text(), successAndCatchErrorToastOptions)
      }
      
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    } finally {
      handleCloseDeleteModal()
    }
  }

  const updatedUsers = (users) => {
    const dateFields = ['createdTime', 'updatedTime', 'birth']
    return (users || []).map(user => {
      const updatedUser = {}
      for (let key in user) {
        if (key === 'emailId' || key === 'status') {
          updatedUser[key] = user[key]
        } else if (typeof user[key] === 'string' && !dateFields.includes(key)) {
          updatedUser[key] = user[key].charAt(0).toUpperCase() + user[key].slice(1).toLowerCase()
        } else {
          updatedUser[key] = user[key]
        }
      }
      updatedUser.status = user.status === 1 ? 'Active' : ''
      return updatedUser
    })
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
                              className={`me-2 rounded-0 ${styles.userImgView}`}
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>{user.emailId}</td>
                          <td>{user.role}</td>
                          <td>
                            {user.status === 'Active' ? (
                              <span className="badge badge-md badge-boxed badge-soft-success">
                                {user.status}
                              </span>
                            ) : (
                              <span className="badge badge-md badge-boxed badge-soft-danger">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td>{user.createdName}</td>
                          <td>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => handleReadUserById(user.userId)}>
                              <i className="las la-info-circle text-secondary font-20" />
                            </button>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => navigate(`/users/${user.userId}/`)}> 
                              <i className="las la-pen text-secondary font-20" />
                            </button>
                            <button type="button" className="btn p-0 border-0 bg-transparent" onClick={() => openDeleteModal(user.userId)}>
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
            <h4>Are you sure you want to delete this user?</h4>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>

      {/* Details Modal */}
      <Modall
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        labels={labels}
      />
    </>
  )
}

export default ReadUsersList