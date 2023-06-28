/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";

export const TableAddress = ({ actividad }) => {
  return (
    <Table striped bordered hover variant="ligth">
      <thead>
        <tr>
          <th>Actividad Vulnerable</th>
          <th>Entidad Federativa</th>
          <th>Municipio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{actividad.actividadVulnerableRealizada}</td>
          <td>{actividad.entidadFederativa}</td>
          <td>{actividad.municipio}</td>
        </tr>
      </tbody>
    </Table>
  );
};
