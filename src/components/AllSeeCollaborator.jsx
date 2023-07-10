import { useProfile } from "../hooks/useProfile";

export const AllSeeCollaborator = () => {
  const { colaborador } = useProfile();
  const {
    apellido_materno,
    apellido_paterno,
    clave_pais,
    clave_unica,
    fecha_designacion,
    fecha_nacimiento,
    nombre,
    rfc,
  } = colaborador;
  return (
    <div>
      <p className="fw-bold fs-4">
        Nombre: <span className="fw-normal">{nombre}</span>
      </p>
      <p className="fw-bold fs-4">
        Apellido Paterno: <span className="fw-normal">{apellido_paterno}</span>
      </p>
      <p className="fw-bold fs-4">
        Apellido Materno: <span className="fw-normal">{apellido_materno}</span>
      </p>
      <p className="fw-bold fs-4">
        Fecha de Nacimiento:{" "}
        <span className="fw-normal">{fecha_nacimiento}</span>
      </p>
      <p className="fw-bold fs-4">
        RFC: <span className="fw-normal">{rfc}</span>
      </p>
      <p className="fw-bold fs-4">
        Fecha de designacion:{" "}
        <span className="fw-normal">{fecha_designacion}</span>
      </p>
      <p className="fw-bold fs-4">
        Clave Pais: <span className="fw-normal">{clave_pais}</span>
      </p>
      <p className="fw-bold fs-4">
        Clave Unica: <span className="fw-normal">{clave_unica}</span>
      </p>
    </div>
  );
};
