import { Modal, Button } from "react-bootstrap";

const ModalView = ({ showModal, handleCloseModal, selectedUser, labels }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{labels?.title || "Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <table style={{ width: "100%", fontSize: "14px" }}>
            <tbody>
              <tr><td><strong>{labels?.name}</strong></td><td>:</td><td>{selectedUser.name}</td></tr>
              
              
              {labels?.title === "User Details" && (
                <>
                <tr><td><strong>{labels?.dob}</strong></td><td>:</td><td>{selectedUser.dob || selectedUser.client}</td></tr>
                <tr><td><strong>{labels?.email}</strong></td><td>:</td><td>{selectedUser.ext || selectedUser.manager}</td></tr>
                <tr><td><strong>{labels?.role}</strong></td><td>:</td><td>{selectedUser.role}</td></tr>
                </>
              )}
              {labels?.title === "Project Details" && (
                <>
                  <tr><td><strong>Client Name</strong></td><td>:</td><td>{selectedUser.client}</td></tr>
                  <tr><td><strong>Manager Name</strong></td><td>:</td><td>{selectedUser.manager}</td></tr>
                  <tr><td><strong>Employee allotted</strong></td><td>:</td><td>{selectedUser.employee}</td></tr>
                  <tr><td><strong>Start Date</strong></td><td>:</td><td>14-Jan-2025</td></tr>
                  <tr><td><strong>End Date</strong></td><td>:</td><td>10-Dec-2025</td></tr>
                </>
              )}
              <tr><td><strong>{labels?.createdAt}</strong></td><td>:</td><td>{selectedUser.createdAt || "10-Dec-2024 16:17:46"}</td></tr>
              <tr><td><strong>{labels?.createdBy}</strong></td><td>:</td><td>{selectedUser.createdBy}</td></tr>
              <tr><td><strong>{labels?.updatedAt}</strong></td><td>:</td><td>{selectedUser.updatedAt || "20-May-2025 18:17:46"}</td></tr>
              <tr><td><strong>{labels?.updatedBy}</strong></td><td>:</td><td>{selectedUser.updatedBy || "Ganesh"}</td></tr>
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
           Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
