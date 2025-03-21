import { useState } from "react"
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

const DataTables = () => {
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
      accessor: "profile",
      Cell: ({ row }) => {
        return row.values.id ? (
          <img src={user} alt="Custom" width="50" />
        ) : null;
      },
    },
    {
      Header: "Name",
      accessor: "name",
      defaultCanSort: true,
    },
    {
      Header: "Email",
      accessor: "ext",
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
      accessor: "createdBy",
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
  

  return (
    <>
      <PageBreadcrumb title="Users List" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Table
                columns={columns}
                data={customersDetails}
                pageSize={5}
                sizePerPageList={[
                  { text: "5", value: 5 },
                  { text: "10", value: 10 },
                  { text: "25", value: 25 },
                  { text: "All", value: customersDetails.length },
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

export default DataTables;
