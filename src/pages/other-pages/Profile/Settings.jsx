import { Col, Row } from 'react-bootstrap'
import PersonalInformation from './components/PersonalInformation'
import ChangePassword from './components/ChangePassword'

const Settings = () => {
	return (
		<Row>
			<Col lg={6} xl={6}>
				<PersonalInformation />
			</Col>
			<Col lg={6} xl={6}>
				<ChangePassword />
			</Col>
		</Row>
	)
}
export default Settings
