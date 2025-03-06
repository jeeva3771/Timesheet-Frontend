import { PageBreadcrumb } from '@/components'
import { Col, Row } from 'react-bootstrap'
import AllProjects from './components/AllProjects'
import Statistics from './components/Statistics'

const Project = () => {
	return (
		<>
			<PageBreadcrumb subName="Dashboard" title="Home" />

			<Statistics />

			<Row>
				<Col lg={12}>
					<AllProjects />
				</Col>
				
			</Row>
		</>
	)
}
export default Project
