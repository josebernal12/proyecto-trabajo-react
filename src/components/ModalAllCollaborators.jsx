import { Button, Modal } from "react-bootstrap"

export const ModalAllCollaborators = () => {
  return (
    <Modal
    // show={modalVerActividadVulnerable}
    // onHide={}
  >
    <Modal.Header closeButton>
      <Modal.Title>Actividad Vulnerable</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
      >
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
