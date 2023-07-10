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
    actividadVulnerable,
    setActividadVulnerable,
  } = useProfile();

  return (
    <>
      <Modal
        show={modalVerActividadVulnerable}
        onHide={() => {
          setModalVerActividadVulnerable(false);
          setActividadVulnerable({});
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actividad Vulnerable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllSeeActivity/>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalVerActividadVulnerable(false);
              setActividadVulnerable({});
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
