import { useState } from "react"
import { PageBreadcrumb } from '@/components'


import { Row, Col, Card, CardBody, Button, Form } from "react-bootstrap"

const Timesheet = () => {
    const [fields, setFields] = useState([])

    const handleAdd = () => {
        setFields([...fields, { id: fields.length + 1 }])
    }

    return (
        <>
            <PageBreadcrumb title="Report" />
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={new Date().toISOString().split('T')[0]}  className="form-control w-auto" readOnly/>
                                </Col>
                            </Row>

                            <Row className="fw-bold border-bottom mb-3">
                                <Col md={3}>Project</Col>
                                <Col md={3}>Task</Col>
                                <Col md={2}>Hours</Col>
                                <Col md={4}>Documents</Col>
                            </Row>

                            {fields.map((field) => (
                                <Row key={field.id} className="mb-2">
                                    <Col md={3}>
                                        <Form.Select defaultValue="">
                                            <option value="" disabled>Select a project</option>
                                            <option value="1">Digital Marketing</option>
                                            <option value="2">Hotel Management</option>
                                            <option value="3">Product Development</option>
                                            <option value="4">Timesheet</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <textarea 
                                            rows="4" 
                                            cols="50" 
                                            placeholder="Enter task" 
                                            className="form-control"
                                        ></textarea>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control type="number" placeholder="Hours" />
                                        <Form.Text className="text-muted">
                                            Enter hours (<b>e.g.,</b> 1 for 1:00, 1.15 for 1:25, 1.30 for 1:50, 1.45 for 1.75)
                                        </Form.Text>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control type="file" accept=".pdf,.xlsx" />
                                        <Form.Text className="text-muted">
                                            Maximum uploaded file size: 5MB ( <b>Supported Only:</b> .pdf,.xlsx )
                                        </Form.Text>
                                    </Col>
                                </Row>
                            ))}

                            <Row className="mt-3 justify-content-end">
                                <Col xs="auto">
                                    <Button onClick={handleAdd} className="me-2">Add</Button>
                                    {fields.length > 0 && <Button className="btn btn-success">Submit</Button>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Timesheet
