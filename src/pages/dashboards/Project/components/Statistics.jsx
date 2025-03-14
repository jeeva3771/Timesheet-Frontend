import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { FiLayers, FiUsers , FiUserPlus} from 'react-icons/fi'
const Statistics = () => {
	return (
		<Row className="justify-content-center">
			<Col md={6} lg={3}>
				<Card className="report-card">
					<CardBody>
						<Row className="d-flex justify-content-center">
							<Col>
								<p className="text-dark mb-1 fw-semibold">Manager(s)</p>
								<h4 className="my-1">2</h4>
								<p className="mb-0 text-truncate text-muted">
									<span className="text-success">
										<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
									</span>
									2 Member(s)
								</p>
							</Col>
							<Col xs="auto" className="align-self-center">
								<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
									<FiUserPlus className="align-self-center text-muted icon-sm" />
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
			<Col md={6} lg={3}>
				<Card className="report-card">
					<CardBody>
						<Row className="d-flex justify-content-center">
							<Col>
								<p className="text-dark mb-1 fw-semibold">Employee(s)</p>
								<h4 className="my-1">9</h4>
								<p className="mb-0 text-truncate text-muted">
									<span className="text-success">
										<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
									</span>
									9 Member(s)
								</p>
							</Col>
							<Col xs="auto" className="align-self-center">
								<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
									<FiUsers className="align-self-center text-muted icon-sm" />
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
			<Col md={6} lg={3}>
				<Card className="report-card">
					<CardBody>
						<Row className="d-flex justify-content-center">
							<Col>
								<p className="text-dark mb-1 fw-semibold">Project(s)</p>
								<h4 className="my-1">40</h4>
								<p className="mb-0 text-truncate text-muted">
									<span className="text-success">
										<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
									</span>
									<span className="text-muted">26 Project Complete</span> 
								</p>
							</Col>
							<Col xs="auto" className="align-self-center">
								<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
									<FiLayers className="align-self-center text-muted icon-sm" />
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
			<Col md={6} lg={3}>
				<Card className="report-card">
					<CardBody>
						<Row className="d-flex justify-content-center">
							<Col>
								<p className="text-dark mb-1 fw-semibold">Client(s)</p>
								<h4 className="my-1">7</h4>
								<p className="mb-0 text-truncate text-muted">
									<span className="text-success">
										<i className="mdi mdi-checkbox-marked-circle-outline me-1" />
									</span>
									<span className="text-muted">7 Member(s)</span>
								</p>
							</Col>
							<Col xs="auto" className="align-self-center">
								<div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
									<FiUsers className="align-self-center text-muted icon-sm" />
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
	)
}
export default Statistics
