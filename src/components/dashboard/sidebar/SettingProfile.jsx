// import { useState } from 'react'
// import { useAuth } from '../../../hooks/useAuth'
// import clientAxios from '../../../config/clientAxios'
// import { AlertaGreat } from '../../alertaGreat/AlertaGreat'
// import { OneError } from '../../errors/OneError'
import { useLocation, Link } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
import { useAuth } from "../../../hooks/useAuth";
export const SettingProfile = () => {
  const location = useLocation();
  const { profile } = useProfile();
  const { auth } = useAuth();
  const { contribuyente, email, nombreComercial, persona, rfc } = auth;
  const { fechaNacimiento, numeroMovil, numeroTelefonico } = profile;
  // const { auth, setAuth } = useAuth()
  // const [name, setName] = useState(auth.contribuyente)
  // const [rfc, setRfc] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [repeatPassword, setRepeatPassword] = useState('')
  // const [error, setError] = useState('')
  // const [alertBgGreen, setAlertBgGreen] = useState('')
  // const [typePerson, setTypePerson] = useState('')

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <nav className="d-flex gap-3 fs-3">
          <Link
            to={"/dashboard/configurar-perfil"}
            className={`${
              location.pathname === "/dashboard/configurar-perfil"
                ? "bg-primary text-white rounded"
                : ""
            } nav-link fs-3 p-2  `}
          >
            Información Perfil
          </Link>
          <Link
            to={"/dashboard/configurar-perfil/actividad-vulnerables"}
            className={`${
              location.pathname ===
              "/dashboard/configurar-perfil/actividad-vulnerables"
                ? "bg-primary text-white  rounded"
                : ""
            } nav-link fs-3 p-2  `}
          >
            Actividades Vulnerables
          </Link>
        </nav>
        <button className="btn btn-primary text-uppercase fs-4 fw-bold py-3">
          Actualizar Perfil
        </button>
      </div>

      <div className="mt-5 container-xl w-50 ">
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
              RFC: <span className="ms-2 fw-normal text-secondary">{rfc}</span>
            </li>
          </ul>
        </div>
        <div className="mt-5 shadow bg-white p-3 ">
          <h2 className="mb-3 text-center">Información Extra</h2>
          <ul className="informacion-lista">
            <li className="fs-3 mb-3 fw-bold">
              Fecha de Nacimiento:{" "}
              <span className="ms-2 fw-normal text-secondary">{fechaNacimiento}</span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Numero Celular:{" "}
              <span className="ms-2 fw-normal text-secondary">{numeroMovil}</span>
            </li>{" "}
            <li className="fs-3 mb-3 fw-bold">
              Numero de Telefono:{" "}
              <span className="ms-2 fw-normal text-secondary">{numeroTelefonico }</span>
            </li>{" "}
          </ul>
        </div>
      </div>
    </>
  );
};
