import { Modal, Button } from "react-bootstrap"
import styles from './App.module.css'
import clsx from "clsx"

const ModalView = ({ showModal, handleCloseModal, data, labels }) => {
  const renderUserDetails = () => (
    <>
      <tr>
        <td><strong>Profile</strong></td>
        <td>:</td>
        <td><img src={data.image} alt="Custom" className={styles.wid100} /></td>
      </tr>
      <tr>
        <td><strong>{labels?.name}</strong></td>
        <td>:</td>
        <td>{data.name}</td>
      </tr>
      <tr>
        <td><strong>{labels?.dob}</strong></td>
        <td>:</td>
        <td>{data.birth || data.client}</td>
      </tr>
      <tr>
        <td><strong>{labels?.email}</strong></td>
        <td>:</td>
        <td>{data.emailId || data.manager}</td>
      </tr>
      <tr>
        <td><strong>{labels?.role}</strong></td>
        <td>:</td>
        <td>{data.role}</td>
      </tr>
      <tr>
        <td><strong>{labels?.status}</strong></td>
        <td>:</td>
        <td>
          <span className={clsx(
            "badge badge-md badge-boxed",
            data.status === "Active" ? "badge-soft-success" : "badge-soft-danger"
          )}>
            {data.status === "Active" ? "Active" : "Inactive"}
          </span>
        </td>
      </tr>
    </>
  )

  const renderProjectDetails = () => (
    <>
      <tr>
        <td><strong>{labels?.name}</strong></td>
        <td>:</td>
        <td>{data.projectName}</td>
      </tr>
      <tr>
        <td><strong>{labels?.client}</strong></td>
        <td>:</td>
        <td>{data.clientName}</td>
      </tr>
      <tr>
        <td><strong>{labels?.manager}</strong></td>
        <td>:</td>
        <td>{data.managerName}</td>
      </tr>
      <tr>
        <td><strong>{labels?.employees}</strong></td>
        <td>:</td>
        <td>{data.assignedEmployeeNames}</td>
      </tr>
      <tr>
        <td><strong>{labels?.startDate}</strong></td>
        <td>:</td>
        <td>{data.projectStart}</td>
      </tr>
      <tr>
        <td><strong>{labels?.endDate}</strong></td>
        <td>:</td>
        <td>{data.projectEnd}</td>
      </tr>
      <tr>
        <td><strong>{labels?.status}</strong></td>
        <td>:</td>
        <td>
          <span className={clsx(
            "badge badge-md badge-boxed",
            data.status === "active" ? "badge-soft-success" :
            data.status === "completed" ? "badge-soft-danger" :
            data.status === "pending" ? "badge-soft-warning" :
            "badge-soft-secondary"
          )}>
            {data.status === "active" ? "Active" :
             data.status === "completed" ? "Completed" :
             data.status === "pending" ? "Pending" :
             data.status === "notStarted" ? "Not Started" :
             data.status}
          </span>
        </td>
      </tr>
    </>
  );

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{labels?.title || "Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && (
          <table style={{ width: "100%", fontSize: "14px" }}>
            <tbody>
              {labels?.title === "User Details" && renderUserDetails()}
              {labels?.title === "Project Details" && renderProjectDetails()}
              <tr>
                <td><strong>{labels?.createdAt}</strong></td>
                <td>:</td>
                <td>{data.createdTime || ""}</td>
              </tr>
              <tr>
                <td><strong>{labels?.createdName}</strong></td>
                <td>:</td>
                <td>{data.createdName || "---"}</td>
              </tr>
              <tr>
                <td><strong>{labels?.updatedAt}</strong></td>
                <td>:</td>
                <td>{data.updatedTime || ""}</td>
              </tr>
              <tr>
                <td><strong>{labels?.updatedName}</strong></td>
                <td>:</td>
                <td>{data.updatedName || "---"}</td>
              </tr>
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
  )
}

export default ModalView
