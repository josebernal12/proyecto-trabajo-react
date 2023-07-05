import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Wizard from "./auth/Wizard";
import { useProfile } from "../hooks/useProfile";

export const ModalData = () => {
  const {
    showModal,
    setShowModal,
    setModalCompletado,
   
  } = useProfile();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      className="modal "
      show={showModal}
      onHide={() => {
        handleClose();
        setModalCompletado(true);
      }}
      backdrop="static"
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Wizard />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn btn-secondary"
          onClick={() => {
            handleClose();
            setModalCompletado(true);
          }}
        >
          Omitir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
