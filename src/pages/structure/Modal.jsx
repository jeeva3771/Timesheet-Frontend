import { Modal, Button } from "react-bootstrap"
import styles from './App.module.css'
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
            {labels?.title === "User Details" && (
              <tr><td><strong>Profile</strong></td><td>:</td><td><img src={selectedUser.image} alt="Custom" className={styles.wid100} /></td></tr>
            )}
              <tr><td><strong>{labels?.name}</strong></td><td>:</td><td>{selectedUser.name}</td></tr>
              
              {labels?.title === "User Details" && (
                <>
                <tr><td><strong>{labels?.dob}</strong></td><td>:</td><td>{selectedUser.birth || selectedUser.client}</td></tr>
                <tr><td><strong>{labels?.email}</strong></td><td>:</td><td>{selectedUser.emailId || selectedUser.manager}</td></tr>
                <tr><td><strong>{labels?.role}</strong></td><td>:</td><td>{selectedUser.role}</td></tr>
                <tr><td><strong>{labels?.status}</strong></td><td>:</td><td>
                {selectedUser.status === 'Active' ? (
                              <span className="badge badge-md badge-boxed badge-soft-success">
                                {selectedUser.status}
                              </span>
                            ) :  (
                              <span className="badge badge-md badge-boxed badge-soft-danger">
                                Inactive
                              </span>
                            )}</td></tr>
                </>
              )}
              {labels?.title === "Project Details" && (
                <>
                  <tr><td><strong>Client Name</strong></td><td>:</td><td>{selectedUser.clientName}</td></tr>
                  <tr><td><strong>Manager Name</strong></td><td>:</td><td>{selectedUser.manager}</td></tr>
                  <tr><td><strong>Employee allotted</strong></td><td>:</td><td>{selectedUser.employee}</td></tr>
                  <tr><td><strong>Start Date</strong></td><td>:</td><td>14-Jan-2025</td></tr>
                  <tr><td><strong>End Date</strong></td><td>:</td><td>10-Dec-2025</td></tr>
                  <tr><td><strong>{labels?.status}</strong></td><td>:</td><td>{selectedUser.status}</td></tr>
                </>
              )}
              <tr><td><strong>{labels?.createdAt}</strong></td><td>:</td><td>{selectedUser.createdTime || ""}</td></tr>
              <tr><td><strong>{labels?.createdName}</strong></td><td>:</td><td>{selectedUser.createdName || "---"}</td></tr>
              <tr><td><strong>{labels?.updatedAt}</strong></td><td>:</td><td>{selectedUser.updatedTime || ""}</td></tr>
              <tr><td><strong>{labels?.updatedName}</strong></td><td>:</td><td>{selectedUser.updatedName || "---"}</td></tr>
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
