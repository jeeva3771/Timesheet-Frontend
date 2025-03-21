import { PageBreadcrumb } from '@/components'
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'react-bootstrap'
import { customersDetails } from './data'
import { Table } from '@/components'
import { useState } from 'react'
import Modal from '../Modal'
import clsx from 'clsx'

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value: customersDetails.length,
    },
]
const DataTables = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (userData) => {
    setSelectedUser(userData)
    setShowModal(true)
    }

    const handleCloseModal = () => {
    setShowModal(false)
    setSelectedUser(null)
    }
    const columns = [
        {
            Header: 'S. No.',
            accessor: 'id',
            defaultCanSort: true,
        },
        {
            Header: 'Project',
            accessor: 'name',
            defaultCanSort: true,
        },
        {
            Header: 'Client Name',
            accessor: 'client',
            defaultCanSort: true,
        },
        {
            Header: 'Manager Name',
            accessor: 'manager',
            defaultCanSort: true,
        },
        {
            Header: 'Employee allotted',
            accessor: 'employee',
            defaultCanSort: true,
        },
        {
            Header: 'Start Date',
            accessor: 'startDate',
            defaultCanSort: true,
        },
        {
            Header: 'End Date',
            accessor: 'endDate',
            defaultCanSort: true,
        },
        {
            Header: 'Status',
            accessor: 'status',
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
            Header: 'Action',
            accessor: 'action',
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
        }
    ]

    const labels = {
        title: "Project Details",
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
            <PageBreadcrumb title="Projects List" />
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <Table
                                columns={columns}
                                data={customersDetails}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                table='project'
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal showModal={showModal} handleCloseModal={handleCloseModal} selectedUser={selectedUser} labels={labels}/>

        </>
    )
}
export default DataTables
