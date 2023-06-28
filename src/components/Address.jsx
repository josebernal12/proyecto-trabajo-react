import Table from "react-bootstrap/Table";
import { useProfile } from "../hooks/useProfile";
import { TableAddress } from "./TableAddress";

export const Address = () => {
  const { AllactividadVulnerable } = useProfile();
  return (
    <>
      <Table striped bordered hover variant="ligth">
        <thead>
          <tr>
            <th>Actividad Vulnerable</th>
            <th>Entidad Federativa</th>
            <th>Municipio</th>
          </tr>
        </thead>
        <tbody>
          {AllactividadVulnerable.map((actividad) => (
            <TableAddress key={actividad._id} actividad={actividad} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
