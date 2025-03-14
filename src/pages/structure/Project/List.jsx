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
        Header: 'Created By',
        accessor: 'createdBy',
        defaultCanSort: true,
    },
    {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
            <td className="text-center">
                <Link to="">
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
        </>
    )
}
export default DataTables
