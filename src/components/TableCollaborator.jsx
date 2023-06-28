/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";

export const TableCollaborator = ({ colaborador }) => {
  return (
    <Table striped bordered hover variant="ligth">
      <thead>
        <tr>
          <th>Nombre Colaborador</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{colaborador.nombre}</td>
          <td>{colaborador.apellido_paterno}</td>
          <td>{colaborador.apellido_materno}</td>
        </tr>
      </tbody>
    </Table>
  );
};
