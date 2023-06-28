import { useProfile } from "../hooks/useProfile";
import { TableCollaborator } from "./TableCollaborator";
import Table from "react-bootstrap/Table";

export const Collaborators = () => {
  const { colaboradores } = useProfile();

  return (
    <>
      <Table striped bordered hover variant="ligth">
        <thead>
          <tr>
            <th>Nombre Colaborador</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <TableCollaborator
              key={colaborador._id}
              colaborador={colaborador}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
