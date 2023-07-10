import { Button, Modal } from "react-bootstrap";
import { useProfile } from "../hooks/useProfile";
import { AllSeeCollaborator } from "./AllSeeCollaborator";

export const ModalAllCollaborators = () => {
  const { setModalVerColaboradores, modalVerColaboradores, setColaborador } =
    useProfile();
  return (
    <Modal
      show={modalVerColaboradores}
      onHide={() => {
        setModalVerColaboradores(false);
        setColaborador({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Colaborador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AllSeeCollaborator />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setModalVerColaboradores(false);
            setColaborador({});
          }}
          variant="secondary"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
