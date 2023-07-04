/* eslint-disable react/prop-types */

import { useProfile } from "../hooks/useProfile";

export const TableCollaborator = ({ colaborador, handleColaboradores }) => {
  const { deleteColaborador } = useProfile();
  return (
    <tr>
      <td>{colaborador.nombre}</td>
      <td>{colaborador.apellido_paterno}</td>
      <td>{colaborador.apellido_materno}</td>
      <td className="d-flex gap-3">
        <button
          onClick={() => handleColaboradores(colaborador)}
          className="btn btn-primary"
        >
          Actualizar
        </button>
        <button
          onClick={() => deleteColaborador(colaborador._id)}
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
