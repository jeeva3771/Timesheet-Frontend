// import { PageBreadcrumb } from '@/components'
// import { Link } from 'react-router-dom'
// import {
// 	Card,
// 	CardBody,
// 	Col,
// 	Row,
// } from 'react-bootstrap'
// import { customersDetails } from './data'
// import { Table } from '@/components'

// const sizePerPageList = [
// 	{
// 		text: '5',
// 		value: 5,
// 	},
// 	{
// 		text: '10',
// 		value: 10,
// 	},
// 	{
// 		text: '25',
// 		value: 25,
// 	},
// 	{
// 		text: 'All',
// 		value: customersDetails.length,
// 	},
// ]
// const DataTables = () => {
// 	const [expandedRow, setExpandedRow] = useState(null);

// 	// Toggle Row Function
// 	const toggleRow = (id) => {
// 	  setExpandedRow(expandedRow === id ? null : id);
// 	};

// 	const columns = [
// 		{
// 			Header: "", // Empty header for expand button
// 			accessor: "expand",
// 			Cell: ({ row }) => (
// 				<Button
// 				variant="link"
// 				onClick={() => toggleRow(row.original.id)}
// 				style={{ textDecoration: "none", fontSize: "20px" }}
// 				>
// 				{expandedRow === row.original.id ? "−" : "+"}
// 				</Button>
// 			),
// 		},
// 		{
// 			Header: 'S. No.',
// 			accessor: 'id',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Name',
// 			accessor: 'name',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Project',
// 			accessor: 'project',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Date',
// 			accessor: 'date',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Task',
// 			accessor: 'task',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Hour(s) Worked',
// 			accessor: 'hours',
// 			defaultCanSort: true,
// 		},
// 		{
// 			Header: 'Documents',
// 			accessor: 'document',
// 			defaultCanSort: false,
// 			Cell: ({ value }) => 
// 				value ? (
// 					<a href={value} target="_blank" rel="noopener noreferrer" className="text-primary">
// 						View
// 					</a>
// 				) : 'No Document',
// 		},
		
	
// 	]
// 	return (
// 		<>
// 			<PageBreadcrumb title="Time Sheets List"/>
// 			<Row>
// 				<Col xs="12">
// 					<Card>
// 						<CardBody>
// 							<Table
// 								columns={columns}
// 								data={customersDetails}
// 								pageSize={5}
// 								sizePerPageList={sizePerPageList}
// 								isSortable={true}
// 								pagination={true}
// 								isSearchable={true}
// 								{expandedRow && <ExpandedRow rowData={customersDetails.find((item) => item.id === expandedRow)} />}
// 							/>
// 						</CardBody>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</>
// 	)
// }
// export default DataTables


// import { useState } from "react";
// import { PageBreadcrumb } from "@/components";
// import { Card, CardBody, Col, Row, Button, Form } from "react-bootstrap";
// import { Table } from "@/components";
// import { customersDetails } from "./data";
// import ExpandedRow from "./expandedRows";

// const DataTables = () => {
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [selectedPerson, setSelectedPerson] = useState(""); // Selected person
//   const [selectedProject, setSelectedProject] = useState(""); // Selected project
//   const [startDate, setStartDate] = useState(""); // Start date
//   const [endDate, setEndDate] = useState(""); // End date

//   // Toggle Row Function
//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   // Filter data based on selected person, project, and date range
//   const filteredData = customersDetails.filter((item) => {
//     const personMatch = selectedPerson ? item.name === selectedPerson : true;
//     const projectMatch = selectedProject ? item.project === selectedProject : true;
//     const dateMatch =
//       (!startDate || new Date(item.date) >= new Date(startDate)) &&
//       (!endDate || new Date(item.date) <= new Date(endDate));
//     return personMatch && projectMatch && dateMatch;
//   });

//   const columns = [
//     {
//       Header: "", // Column for the expand button
//       accessor: "expand",
//       Cell: ({ row }) => (
//         <Button
//           variant="link"
//           onClick={() => toggleRow(row.original.id)}
//           style={{ textDecoration: "none", fontSize: "20px" }}
//         >
//           {expandedRow === row.original.id ? "−" : "+"}
//         </Button>
//       ),
//     },
//     { Header: "S. No.", accessor: "id", defaultCanSort: true },
//     { Header: "Name", accessor: "name", defaultCanSort: true },
//     { Header: "Project", accessor: "project", defaultCanSort: true },
//     { Header: "Date", accessor: "date", defaultCanSort: true },
//     { Header: "Task", accessor: "task", defaultCanSort: true },
//     { Header: "Hour(s) Worked", accessor: "hours", defaultCanSort: true },
//     {
//       Header: "Documents",
//       accessor: "document",
//       defaultCanSort: false,
//       Cell: ({ value }) =>
//         value ? (
//           <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary">
//             View
//           </a>
//         ) : (
//           "No Document"
//         ),
//     },
//   ];

//   return (
//     <>
//       <PageBreadcrumb title="Time Sheets List" />
//       <Row>
//         <Col xs="12">
//           <Card>
//             <CardBody>
//               {/* Filter Section */}
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Select Person</Form.Label>
//                     <Form.Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
//                       <option value="">All</option>
//                       {[...new Set(customersDetails.map((item) => item.name))].map((name) => (
//                         <option key={name} value={name}>
//                           {name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Select Project</Form.Label>
//                     <Form.Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
//                       <option value="">All</option>
//                       {[...new Set(customersDetails.map((item) => item.project))].map((project) => (
//                         <option key={project} value={project}>
//                           {project}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>Start Date</Form.Label>
//                     <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>End Date</Form.Label>
//                     <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col md={2} className="d-flex align-items-end">
//                   <Button
//                     variant="danger"
//                     onClick={() => {
//                       setSelectedPerson("");
//                       setSelectedProject("");
//                       setStartDate("");
//                       setEndDate("");
//                     }}
//                   >
//                     Reset
//                   </Button>
//                 </Col>
//               </Row>

//               {/* Data Table */}
//               <Table
//                 columns={columns}
//                 data={filteredData} // Use filtered data
//                 pageSize={5}
//                 sizePerPageList={[
//                   { text: "5", value: 5 },
//                   { text: "10", value: 10 },
//                   { text: "25", value: 25 },
//                   { text: "All", value: customersDetails.length },
//                 ]}
//                 isSortable={true}
//                 pagination={true}
//                 isSearchable={true}
//                 getRowProps={(row) => ({
//                   style: row.original.id === expandedRow ? { backgroundColor: "#f8f9fa" } : {},
//                 })}
//               />
//               {expandedRow && <ExpandedRow rowData={filteredData.find((item) => item.id === expandedRow)} />}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default DataTables;


import { useState } from "react"
import { PageBreadcrumb } from "@/components"
import { Card, CardBody, Col, Row, Button, Form, Modal } from "react-bootstrap"
import { Table } from "@/components"
import { customersDetails } from "./data"
import user from "../../../assets/images/document.png"
const DataTables = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleViewDocument = (url) => {
    setDocumentUrl(url);
    setShowModal(true);
  };

  const filteredData = customersDetails.filter((item) => {
    const personMatch = selectedPerson ? item.name === selectedPerson : true;
    const projectMatch = selectedProject ? item.project === selectedProject : true;
    const dateMatch =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));
    return personMatch && projectMatch && dateMatch;
  });

  const columns = [
    { Header: "S. No.", accessor: "id", defaultCanSort: true },
    { Header: "Name", accessor: "name", defaultCanSort: true },
    { Header: "Project", accessor: "project", defaultCanSort: true },
    { Header: "Date", accessor: "date", defaultCanSort: true },
    { Header: "Task", accessor: "task", defaultCanSort: true },
    { Header: "Hour(s) Worked", accessor: "hours", defaultCanSort: true },
    {
      Header: "Documents",
      accessor: "document",
      defaultCanSort: false,
      Cell: ({ value }) =>
        value ? (
          <Button variant="link" className="text-primary"  style={{ textDecoration: "none" }} onClick={() => handleViewDocument(value)}>
            View
          </Button>
        ) : (
          "No Document"
        ),
    },
  ];

  return (
    <>
      <PageBreadcrumb title="Time Sheets List" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Person</Form.Label>
                    <Form.Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
                      <option value="">All</option>
                      {[...new Set(customersDetails.map((item) => item.name))].map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                      <option value="">All</option>
                      {[...new Set(customersDetails.map((item) => item.project))].map((project) => (
                        <option key={project} value={project}>
                          {project}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedPerson("")
                      setSelectedProject("")
                      setStartDate("")
                      setEndDate("")
                    }}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>

              <Table
                columns={columns}
                data={filteredData}
                pageSize={5}
                sizePerPageList={[
                  { text: "5", value: 5 },
                  { text: "10", value: 10 },
                  { text: "25", value: 25 },
                  { text: "All", value: customersDetails.length },
                ]}
                isSortable={true}
                pagination={true}
                isSearchable={false}
                getRowProps={(row) => ({
                  style: row.original.id === expandedRow ? { backgroundColor: "#f8f9fa" } : {},
                })}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Fullscreen Modal for Viewing Documents */}
      <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Document View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user ? (
            user.endsWith(".pdf") ? (
              <iframe src={user} style={{ width: "100%", height: "100vh", border: "none" }} />
            ) : (
              <img src={user} alt="Document" style={{ width: "100%", height: "auto" }} />
            )
          ) : (
            <p>No document available</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DataTables
