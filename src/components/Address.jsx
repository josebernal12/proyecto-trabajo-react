import Table from "react-bootstrap/Table";
import { useProfile } from "../hooks/useProfile";
import { TableAddress } from "./TableAddress";

export const Address = ({ changeActividadVulnerable }) => {
  const { AllactividadVulnerable, modalCompletado } = useProfile();
  return (
    <>
      <Table striped bordered hover variant="ligth">
        <thead>
          <tr>
            <th>Actividad Vulnerable</th>
            <th>Entidad Federativa</th>
            <th>Municipio</th>
            {modalCompletado ? null : <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {AllactividadVulnerable.map((actividad) => (
            <TableAddress
              changeActividadVulnerable={changeActividadVulnerable}
              key={actividad._id}
              actividad={actividad}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
