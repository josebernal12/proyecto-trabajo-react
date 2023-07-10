/* eslint-disable react/prop-types */

import { useProfile } from "../hooks/useProfile";

export const TableAddress = ({ actividad, changeActividadVulnerable }) => {
  const {
    deleteActividadVulnerable,
    showModal,
    modalCompletado,
    setModalVerActividadVulnerable,
  } = useProfile();
  return (
    <tr>
      <td>{actividad.actividadVulnerableRealizada}</td>
      <td>{actividad.entidadFederativa}</td>
      <td>{actividad.municipio}</td>
      {modalCompletado ? null : (
        <td className="d-flex gap-3">
          <button
            onClick={(e) => changeActividadVulnerable(e, actividad)}
            className="btn btn-primary"
          >
            Actualizar
          </button>
          <button
            onClick={() => deleteActividadVulnerable(actividad._id)}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </td>
      )}
      <td>
        <button
          onClick={() => setModalVerActividadVulnerable(true)}
          className="btn btn-warning fw-bold text-uppercase "
        >
          Ver Actividad Vulnerable
        </button>
      </td>
    </tr>
  );
};
