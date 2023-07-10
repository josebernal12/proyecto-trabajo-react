import { useProfile } from "../hooks/useProfile";

export const AllSeeActivity = () => {
  const { actividadVulnerable } = useProfile();

  const {
    actividadVulnerableRealizada,
    calle,
    codigoPostal,
    colonia,
    entidadFederativa,
    municipio,
    numeroExterior,
    numeroInterior,
    tipoVialidad,
  } = actividadVulnerable;
  return (
    <div>
      <p className="fw-bold fs-4">
        Actividad Vulnerable Realizada:{" "}
        <span className="fw-normal">{actividadVulnerableRealizada}</span>
      </p>
      <p className="fw-bold fs-4">
        Tipo De Vialidad: <span className="fw-normal">{tipoVialidad}</span>
      </p>
      <p className="fw-bold fs-4">
        Entidad Federativa:{" "}
        <span className="fw-normal">{entidadFederativa}</span>
      </p>
      <p className="fw-bold fs-4">
        Municipio: <span className="fw-normal">{municipio}</span>
      </p>
      <p className="fw-bold fs-4">
        Colonia: <span className="fw-normal">{colonia}</span>
      </p>
      <p className="fw-bold fs-4">
        Calle: <span className="fw-normal">{calle}</span>
      </p>
      <p className="fw-bold fs-4">
        Codigo Postal: <span className="fw-normal">{codigoPostal}</span>
      </p>
      <p className="fw-bold fs-4">
        Numero Exterior: <span className="fw-normal">{numeroExterior}</span>
      </p>
      <p className="fw-bold fs-4">
        Numero Interior: <span className="fw-normal">{numeroInterior}</span>
      </p>
    </div>
  );
};
