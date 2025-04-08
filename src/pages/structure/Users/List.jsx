import { useState, useEffect } from "react"
import { PageBreadcrumb } from "@/components"
import { Link } from "react-router-dom"
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

const readUsersList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (userData) => {
    setSelectedUser(userData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      Header: "S. No.",
      accessor: "id",
      defaultCanSort: true,
    },
    {
      Header: "Profile",
      accessor: "image",
    },
    {
      Header: "Name",
      accessor: "name",
      defaultCanSort: true,
    },
    {
      Header: "Email",
      accessor: "emailId",
      defaultCanSort: true,
    },
    {
      Header: "Role",
      accessor: "role",
      defaultCanSort: true,
    },
    {
      Header: "Status",
      accessor: "status",
      defaultCanSort: true,
      Cell: ({ value }) => (
        <span
          className={clsx(
            'badge badge-md badge-boxed',
            value === 'Pending'
              ? 'badge-soft-warning'
              : value === 'Complete'
                ? 'badge-soft-danger'
                : 'badge-soft-success'
          )}
        >
          {value}
        </span>
      ),
    },
    {
      Header: "Created By",
      accessor: "createdName",
      defaultCanSort: true,
    },	
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <td className="text-center">
          <Link to="" onClick={() => handleShowModal(row.original)}>
            <i className="las la-info-circle text-secondary font-20" />
          </Link>
          <Link to="">
            <i className="las la-pen text-secondary font-20" />
          </Link>
          <Link to="">
            <i className="las la-trash-alt text-secondary font-20" />
          </Link>
        </td>
      ),
    },
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
  const [users, setUsers] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [userCount, setUserCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [sortColumn, setSortColumn] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("DESC")

  // const navigate = useNavigate()
  const totalPages = Math.ceil(userCount / limit)

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
              <Table
                columns={columns}
                data={users}
                pageSize={5}
                sizePerPageList={[
                  { text: "5", value: 5 },
                  { text: "10", value: 10 },
                  { text: "25", value: 25 },
                  { text: "All", value: userCount },
                ]}
                isSortable={true}
                pagination={true}
                isSearchable={true}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

	  <Modal showModal={showModal} handleCloseModal={handleCloseModal} selectedUser={selectedUser} labels={labels}/>

    </>
  );
};

export default readUsersList
