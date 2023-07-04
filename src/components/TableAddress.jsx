/* eslint-disable react/prop-types */

import { useProfile } from "../hooks/useProfile";

export const TableAddress = ({ actividad, changeActividadVulnerable }) => {
  const { deleteActividadVulnerable } = useProfile();
  return (
    <tr>
      <td>{actividad.actividadVulnerableRealizada}</td>
      <td>{actividad.entidadFederativa}</td>
      <td>{actividad.municipio}</td>
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
    </tr>
  );
};
