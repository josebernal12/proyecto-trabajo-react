import { useProfile } from "../../../hooks/useProfile";
import { useAuth } from "../../../hooks/useAuth";
import { NavLayout } from "./NavLayout";
import { FormatDate } from "../../../helpers/formatDate";
export const SettingProfile = () => {
  const { profile } = useProfile();
  const { auth } = useAuth();
  const { contribuyente, email, nombreComercial, persona, rfc, Denominacion } =
    auth;
  const {
    fechaNacimiento,
    numeroMovil,
    numeroTelefonico,
    claveLargaDistancia,
    folio,
    fechaEmision,
    fechaInicioAmparo,
    fechaTerminoAmparo,
    clavePaisNacionalidad,
  } = profile;
  return (
    <>
      <NavLayout />

      {auth.persona === "F" ? (
        <div className="mt-5 container-xl  ">
          <div className="shadow bg-white p-3  ">
            <h2 className="mb-3 text-center">Información Personal</h2>
            <ul className="informacion-lista">
              <li className="fs-3 mb-3 fw-bold">
                Nombre:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {contribuyente}
                </span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                Email:
                <span className="ms-2 fw-normal text-secondary">{email}</span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                Nombre Comercial:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {nombreComercial}
                </span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                Tipo de Persona:{" "}
                <span className="ms-2 fw-normal text-secondary">{persona}</span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                RFC:{" "}
                <span className="ms-2 fw-normal text-secondary">{rfc}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-5 container-xl  ">
          <div className="shadow bg-white p-3  ">
            <h2 className="mb-3 text-center">Información Personal</h2>
            <ul className="informacion-lista">
              <li className="fs-3 mb-3 fw-bold">
                Denominación:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {contribuyente}
                </span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                Email:
                <span className="ms-2 fw-normal text-secondary">{email}</span>
              </li>

              <li className="fs-3 mb-3 fw-bold">
                Tipo de Persona:{" "}
                <span className="ms-2 fw-normal text-secondary">{persona}</span>
              </li>
              <li className="fs-3 mb-3 fw-bold">
                RFC:{" "}
                <span className="ms-2 fw-normal text-secondary">{rfc}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {auth.persona === "F" ? (
        <div className="mt-5 container-xl  ">
          <div className="mt-5 shadow bg-white p-3 ">
            <h2 className="mb-3 text-center">Información Extra</h2>
            <ul className="informacion-lista">
              <li className="fs-3 mb-3 fw-bold">
                Fecha de Nacimiento:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {fechaNacimiento}
                </span>
              </li>{" "}
              <li className="fs-3 mb-3 fw-bold">
                Numero Celular:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {numeroMovil}
                </span>
              </li>{" "}
              <li className="fs-3 mb-3 fw-bold">
                Numero de Telefono:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {numeroTelefonico}
                </span>
              </li>{" "}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-5 container-xl  ">
          <div className="mt-5 shadow bg-white p-3 ">
            <h2 className="mb-3 text-center">Información Extra</h2>
            <ul className="informacion-lista">
              <li className="fs-3 mb-3 fw-bold">
                Clave de larga distancia
                <span className="ms-2 fw-normal text-secondary">
                  {claveLargaDistancia}
                </span>
              </li>{" "}
              <li className="fs-3 mb-3 fw-bold">
                Numero Celular:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {numeroMovil}
                </span>
              </li>{" "}
              <li className="fs-3 mb-3 fw-bold">
                Numero de Telefono:{" "}
                <span className="ms-2 fw-normal text-secondary">
                  {numeroTelefonico}
                </span>
              </li>{" "}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-5 container-xl  ">
        <div className="mt-5 shadow bg-white p-3 ">
          <h2 className="mb-3 text-center">Datos Personales</h2>
          <ul className="informacion-lista">
            <li className="fs-3 mb-3 fw-bold">
              Numero de Folio
              <span className="ms-2 fw-normal text-secondary">{folio}</span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Fecha de Emision:{" "}
              <span className="ms-2 fw-normal text-secondary">
                {fechaEmision ? FormatDate(fechaEmision) : null}
              </span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Fecha Inicio Amparo:{" "}
              <span className="ms-2 fw-normal text-secondary">
                {fechaInicioAmparo ? FormatDate(fechaInicioAmparo) : null}
              </span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Fecha Termino Amparo:{" "}
              <span className="ms-2 fw-normal text-secondary">
                {fechaTerminoAmparo ? FormatDate(fechaTerminoAmparo) : null}
              </span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Clave Pais Nacionalidad:{" "}
              <span className="ms-2 fw-normal text-secondary">
                {clavePaisNacionalidad}
              </span>
            </li>{" "}
          </ul>
        </div>
      </div>
    </>
  );
};
