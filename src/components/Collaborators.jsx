import { useProfile } from "../hooks/useProfile";
import { TableCollaborator } from "./TableCollaborator";
import Table from "react-bootstrap/Table";

export const Collaborators = ({ handleColaboradores }) => {
  const { colaboradores, modalCompletado } = useProfile();

  return (
    <>
      <Table striped bordered hover size="xl"  >
        <thead>
          <tr>
            <th>Nombre Colaborador</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            {modalCompletado ? null : <th>Acciones</th>}
            <th>Ver Colaborador</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <TableCollaborator
              key={colaborador._id}
              colaborador={colaborador}
              handleColaboradores={handleColaboradores}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
