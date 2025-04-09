// import { useState, useEffect } from "react"
// import { PageBreadcrumb } from "@/components"
// import { Link } from "react-router-dom"
// import user from "../../../assets/images/users/user-1.jpg"
// import Modal from "../Modal.jsx"
// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
// } from "react-bootstrap";
// import { customersDetails } from "./data"
// import { Table } from "@/components"
// import clsx from "clsx"
// import { readUsers } from "../Api"

// const readUsersList = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = (userData) => {
//     setSelectedUser(userData);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedUser(null);
//   };

//   const columns = [
//     {
//       Header: "S. No.",
//       accessor: "id",
//       defaultCanSort: true,
//     },
//     {
//       Header: "Profile",
//       accessor: "image",
//     },
//     {
//       Header: "Name",
//       accessor: "name",
//       defaultCanSort: true,
//     },
//     {
//       Header: "Email",
//       accessor: "emailId",
//       defaultCanSort: true,
//     },
//     {
//       Header: "Role",
//       accessor: "role",
//       defaultCanSort: true,
//     },
//     {
//       Header: "Status",
//       accessor: "status",
//       defaultCanSort: true,
//       Cell: ({ value }) => (
//         <span
//           className={clsx(
//             'badge badge-md badge-boxed',
//             value === 'Pending'
//               ? 'badge-soft-warning'
//               : value === 'Complete'
//                 ? 'badge-soft-danger'
//                 : 'badge-soft-success'
//           )}
//         >
//           {value}
//         </span>
//       ),
//     },
//     {
//       Header: "Created By",
//       accessor: "createdName",
//       defaultCanSort: true,
//     },	
//     {
//       Header: "Action",
//       accessor: "action",
//       Cell: ({ row }) => (
//         <td className="text-center">
//           <Link to="" onClick={() => handleShowModal(row.original)}>
//             <i className="las la-info-circle text-secondary font-20" />
//           </Link>
//           <Link to="">
//             <i className="las la-pen text-secondary font-20" />
//           </Link>
//           <Link to="">
//             <i className="las la-trash-alt text-secondary font-20" />
//           </Link>
//         </td>
//       ),
//     },
//   ]

//   const labels = {
//     title: "User Details",
//     name: "Name",
//     dob: "Date of Birth",
//     email: "Email",
//     role: "Role",
//     status: "Status",
//     createdAt: "Created At",
//     createdBy: "Created By",
//     updatedAt: "Updated At",
//     updatedBy: "Updated By",
//   }
//   const [users, setUsers] = useState([])
//   const [pageNo, setPageNo] = useState(1)
//   const [userCount, setUserCount] = useState(0)
//   const [limit, setLimit] = useState(10)
//   const [searchText, setSearchText] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [sortColumn, setSortColumn] = useState("createdAt")
//   const [sortOrder, setSortOrder] = useState("DESC")

//   // const navigate = useNavigate()
//   const totalPages = Math.ceil(userCount / limit)

//   useEffect(() => {
//       usersList()
//   }, [pageNo, limit, searchText, sortColumn, sortOrder])

//   const defaultColumn = [
//     { key: '', label: 'Profile' },
//     { key: 'name', label: 'Name' },
//     { key: 'emailId', label: 'Email' },
//     { key: 'role', label: 'Role' },
//     { key: 'status', label: 'Status' },
//     { key: 'createdName', label: 'Created By' },
//   ]


//   const usersList = async () => {
//     try {
//       setLoading(true)
//       const { response, error } = await readUsers(limit, pageNo, sortColumn, sortOrder, searchText || '')
//       if (error) {
//           alert(error)
//           return
//       }

//       if (response.status === 401) {
//           // userLogout('')
//           navigate('/')
//           return
//       }

//       const { users, userCount } = await response.json()
//       const updatedUsers = (users || []).map(user => ({
//         ...user,
//         status: user.status === 1 ? 'Active' : ''
//       }))
//       setUsers(updatedUsers)
//       setUserCount(userCount || 0)
//     } catch (error) {
//         alert('Something went wrong.Please try later')
//     } finally {
//         setLoading(false)
//     }
// }
  

//   return (
//     <>
//       <PageBreadcrumb title="Users List" /> 
//       <Row>
//         <Col xs="12">
//           <Card>
//             <CardBody>
//               <div className="table-responsive">
//                       <table
//                         className={clsx('table table-centered react-table')}
//                       >
//                         <thead >
//                             <tr>
//                               <th>Sno</th>
//                               {defaultColumn.map(({ key, label }) => (
//                                   <th 
//                                       key={key} 
//                                       onClick={() => handleSort(key)} 
//                                       className=""
//                                   >
//                                       {label}
//                                       {sortColumn === key ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""}
//                                   </th>
//                               ))}
//                               <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                           {loading ? (
//                               <tr>
//                                   <td 
//                                       colSpan="7" 
//                                       className="text-center"
//                                   >Loading...
//                                   </td>
//                               </tr>
//                           ) : users.length > 0 ? (
//                               users.map((user, index) => (
//                                   <tr key={index}>
//                                       <td>{(pageNo - 1) * limit + index + 1}</td>
//                                       <td>{(pageNo - 1) * limit + index + 1}</td>
//                                       <td>{user.name}</td>
//                                       <td>{user.emailId}</td>
//                                       <td>{user.role}</td>
//                                       <td>{user.status === 1 ? 'Active' : ''}</td>
//                                       <td>{user.createdName}</td>
//                                       <td>
//                                           {/* <svg 
//                                               xmlns="http://www.w3.org/2000/svg" 
//                                               fill="currentColor" 
//                                               className="bi bi-info-circle mr-2 focus me-1 iconSizing" 
//                                               viewBox="0 0 16 16" 
//                                               // onClick={()=> handleReadBlockById(block.blockId)}
//                                           >
//                                               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
//                                               <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
//                                           </svg> */}
//                                           <Link to="" >
//                                                 <i className="las la-info-circle text-secondary font-20" />
//                                             </Link>
//                                             <Link to="">
//                                               <i className="las la-pen text-secondary font-20" />
//                                             </Link>
//                                             <Link to="">
//                                               <i className="las la-trash-alt text-secondary font-20" />
//                                             </Link>
//                                           {/* <svg 
//                                               xmlns="http://www.w3.org/2000/svg" 
//                                               fill="currentColor" 
//                                               className="bi bi-pencil-square mr-2 focus me-1 iconSizing" 
//                                               viewBox="0 0 16 16"
//                                               // onClick={() => navigate(`/block/${block.blockId}/`)}
//                                           >
//                                               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
//                                               <path 
//                                                   fill-rule="evenodd" 
//                                                   d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
//                                               />
//                                           </svg> */}
//                                           {/* <svg 
//                                               xmlns="http://www.w3.org/2000/svg" 
//                                               fill="currentColor" 
//                                               className="bi bi-trash focus iconSizing" 
//                                               // onClick={()=> handleDeleteBlockById(block.blockId)} 
//                                               viewBox="0 0 16 16"
//                                           >
//                                               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
//                                               <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
//                                           </svg> */}
//                                       </td>
//                                   </tr>
//                               ))
//                           ) : (
//                               <tr>
//                                   <td 
//                                       colSpan="7" 
//                                       className="text-center small"
//                                   >No results found.
//                                   </td>
//                               </tr>
//                           )}
//                       </tbody>

//                       </table>
//                     </div>
              
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>

// 	  <Modal showModal={showModal} handleCloseModal={handleCloseModal} selectedUser={selectedUser} labels={labels}/>

//     </>
//   )
//   }


// export default readUsersList





































import { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import user from "../../../assets/images/users/user-1.jpg"
import Modal from "../Modal.jsx"

import {
  Card,
  CardBody,
  Col,
  Row,
} from "react-bootstrap";
import { customersDetails } from "./data"
import { Table } from "@/components"
import clsx from "clsx"
import { readUsers } from "../Api"
const apiUrl = import.meta.env.VITE_API_URL

const readUsersList = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [usersImages, setUserImages] = useState({})
  const [pageNo, setPageNo] = useState(1)
  const [userCount, setUserCount] = useState(0)
  const [limit, setLimit] = useState(5)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [sortColumn, setSortColumn] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("DESC")

  const navigate = useNavigate()
  const totalPages = Math.ceil(userCount / limit)

  const handleShowModal = (userData) => {
    setSelectedUser(userData)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

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

  const defaultColumn = [
    { key: '', label: 'Profile' },
    { key: 'u.name', label: 'Name' },
    { key: 'u.email', label: 'Email' },
    { key: 'u.role', label: 'Role' },
    { key: 'u.status', label: 'Status' },
    { key: 'ur.name', label: 'Created By' }
  ]


  useEffect(() => {
    usersList()
  }, [pageNo, limit, searchText, sortColumn, sortOrder])


  const usersList = async () => {
    try {
      setLoading(true)
      const { response, error } = await readUsers(limit, pageNo, sortColumn, sortOrder, searchText || '')
      if (error) {
          alert(error)
          return
      }

      if (response.status === 401) {
          // userLogout('')
          navigate('/')
          return
      }

      const { users, userCount } = await response.json()
      const updatedUsers = (users || []).map(user => ({
        ...user,
        status: user.status === 1 ? 'Active' : ''
      }))
      setUsers(updatedUsers)
      setUserCount(userCount || 0)
      const images = {}
      users.forEach(user => {
          images[user.userId] = `${apiUrl}/api/users/avatar/${30}/`//?date=${Date.now()}`
      })
      console.log(images)
      usersImages(images)
    } catch (error) {
        alert('Something went wrong.Please try later')
    } finally {
        setLoading(false)
    }
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
                  // value={value || ''}
                  // onChange={(e) => {
                  // 	setValue(e.target.value)
                  // 	onChange(e.target.value)
                  // }}
                  // placeholder={`${count} records...`}
                  className="form-control w-auto ms-1"
                />
			        </span>
		
              <div className="ms-auto d-flex align-items-center">
                    {/* <span 
                      className={`text-muted fs-6 ${styles.cursorPointer} me-4  ${styles.history}`}
                      onClick={() => navigate('/history/')} 
                    >
                      <i className="mdi mdi-history mdi-18px"></i> History
                    </span> */}
                
                <button type="button" className="btn btn-primary"  onClick={() => navigate('/users/add/')}>ADD</button>
              </div>
            </div>
             <div className="table-responsive">
                <table
                    className={clsx('table table-centered react-table')}
                >
                <thead >
                    <tr>
                        <th>Sno</th>
                        {defaultColumn.map(({ key, label }) => (
                            <th 
                                key={key} 
                                onClick={() => handleSort(key)} 
                                className=""
                            >
                                {label}
                                {sortColumn === key ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""}
                            </th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td 
                                colSpan="7" 
                                className="text-center"
                            >Loading...
                            </td>
                        </tr>
                    ) : users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{(pageNo - 1) * limit + index + 1}</td>
                                <td>{usersImages[user.userId]}
                                    <img 
                                      src={usersImages[user.userId]} 
                                      alt="Profile" 
                                      className="rounded-circle me-2"
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.emailId}</td>
                                <td>{user.role}</td>
                                <td>{user.status === 1 ? 'Active' : ''}</td>
                                <td>{user.createdName}</td>
                                <td>
                                    {/* <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="currentColor" 
                                        className="bi bi-info-circle mr-2 focus me-1 iconSizing" 
                                        viewBox="0 0 16 16" 
                                        // onClick={()=> handleReadBlockById(block.blockId)}
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                    </svg> */}
                                    <Link to="" >
                                        <i className="las la-info-circle text-secondary font-20" />
                                    </Link>
                                    <Link to="">
                                        <i className="las la-pen text-secondary font-20" />
                                    </Link>
                                    <Link to="">
                                        <i className="las la-trash-alt text-secondary font-20" />
                                    </Link>
                                    {/* <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="currentColor" 
                                        className="bi bi-pencil-square mr-2 focus me-1 iconSizing" 
                                        viewBox="0 0 16 16"
                                        // onClick={() => navigate(`/block/${block.blockId}/`)}
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path 
                                            fill-rule="evenodd" 
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                        />
                                    </svg> */}
                                    {/* <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="currentColor" 
                                        className="bi bi-trash focus iconSizing" 
                                        // onClick={()=> handleDeleteBlockById(block.blockId)} 
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td 
                                colSpan="7" 
                                className="text-center small"
                            >No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
             
              </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>

	  <Modal showModal={showModal} handleCloseModal={handleCloseModal} selectedUser={selectedUser} labels={labels}/>

    </>
  );
};

export default readUsersList
