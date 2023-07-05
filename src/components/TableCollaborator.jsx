/* eslint-disable react/prop-types */

import { useProfile } from "../hooks/useProfile";

export const TableCollaborator = ({ colaborador, handleColaboradores }) => {
  const { modalCompletado } = useProfile();
  return (
    <tr>
      <td>{colaborador.nombre}</td>
      <td>{colaborador.apellido_paterno}</td>
      <td>{colaborador.apellido_materno}</td>
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
    </tr>
  );
};
