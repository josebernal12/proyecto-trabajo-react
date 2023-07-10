import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useProfile } from "../hooks/useProfile";
import { AllSeeActivity } from "./AllSeeActivity";

export const ModalSeeActivityVulnerable = () => {
  const {
    setModalVerActividadVulnerable,
    modalVerActividadVulnerable,
    AllactividadVulnerable,
  } = useProfile();

  return (
    <>
      <Modal
        show={modalVerActividadVulnerable}
        onHide={() => setModalVerActividadVulnerable(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actividad Vulnerable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {AllactividadVulnerable.map((activity) => (
            <AllSeeActivity key={activity._id} activity={activity} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalVerActividadVulnerable(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
