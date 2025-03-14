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
		Header: 'Name',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Project',
		accessor: 'project',
		defaultCanSort: true,
	},
	{
		Header: 'Task',
		accessor: 'task',
		defaultCanSort: true,
	},
	{
		Header: 'Hour(s) Worked',
		accessor: 'hours',
		defaultCanSort: true,
	},
	{
		Header: 'Documentation',
		accessor: 'document',
		defaultCanSort: true,
	},
	{
		Header: 'Created By',
		accessor: 'createdBy',
		defaultCanSort: true,
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
			<PageBreadcrumb title="Time Sheets List"/>
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
