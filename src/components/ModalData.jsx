import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Wizard from "./auth/Wizard";

export const ModalData = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // Activar modal al ingresar a la página
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      className="modal "
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton  >
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Wizard />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn btn-secondary" onClick={handleClose}>
          Omitir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
