import { useProfile } from "../hooks/useProfile";
import { TableAddress } from "./TableAddress";

export const Address = () => {
  const { AllactividadVulnerable } = useProfile();
  return (
    <>
      {AllactividadVulnerable.map((actividad) => (
        <TableAddress key={actividad._id} actividad={actividad} />
      ))}
    </>
  );
};
