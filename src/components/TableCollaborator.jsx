/* eslint-disable react/prop-types */

export const TableCollaborator = ({ colaborador }) => {
  return (
    <tr>
      <td>{colaborador.nombre}</td>
      <td>{colaborador.apellido_paterno}</td>
      <td>{colaborador.apellido_materno}</td>
    </tr>
  );
};
