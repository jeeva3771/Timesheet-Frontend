import { Table } from "react-bootstrap";

const ExpandedRow = ({ rowData }) => {
  if (!rowData || !rowData.subRows) return null;

  return (
    <div className="p-3 border rounded bg-light">
      <h6>Additional Details for {rowData.name}</h6>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Age</th>
            <th>Company</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {rowData.subRows.map((sub, index) => (
            <tr key={index}>
              <td>{sub.id}</td>
              <td>{sub.age}</td>
              <td>{sub.company}</td>
              <td>{sub.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpandedRow;
