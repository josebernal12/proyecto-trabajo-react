import { useProfile } from "../hooks/useProfile";
import { TableCollaborator } from "./TableCollaborator";

export const Collaborators = () => {
  const { colaboradores } = useProfile();

  return (
    <>
      {colaboradores.map((colaborador) => (
        <TableCollaborator key={colaborador._id} colaborador={colaborador} />
      ))}
    </>
  );
};
