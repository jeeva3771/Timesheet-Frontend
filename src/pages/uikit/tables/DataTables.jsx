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
		Header: 'ID',
		accessor: 'id',
		defaultCanSort: true,
	},
	{
		Header: 'Profile',
		accessor: 'profile',
		Cell: ({ row }) => {
			// Check if the second column (Name) contains a specific ID
			const id = row.values.id; // Assuming 'id' is the first column
			return (
				<img src={`/src/assets/images/users/user-${id}.jpg`} alt="Custom" width="50" />
			) 
		},
	},
	{
		Header: 'Name',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Email Id',
		accessor: 'ext',
		defaultCanSort: true,
	},
	{
		Header: 'Role',
		accessor: 'city',
		defaultCanSort: true,
	},
	{
		Header: 'Created By',
		accessor: 'startDate',
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
			<PageBreadcrumb title="List" subName="Structure" subName2="User"/>
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
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default DataTables
