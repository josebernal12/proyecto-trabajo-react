import { useLocation, Link } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";

export const NavLayout = () => {
  const location = useLocation();
  const { showModal, setShowModal } = useProfile();

  return (
    <div className="d-flex justify-content-between align-items-center mb-5">
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
        <Link
          to={"/dashboard/configurar-perfil/colaboradores"}
          className={`${
            location.pathname === "/dashboard/configurar-perfil/colaboradores"
              ? "bg-primary text-white  rounded"
              : ""
          } nav-link fs-3 p-2  `}
        >
          Colaboradores
        </Link>
        <Link
          to={"/dashboard/configurar-perfil/factorizacion"}
          className={`${
            location.pathname === "/dashboard/configurar-perfil/factorizacion"
              ? "bg-primary text-white  rounded"
              : ""
          } nav-link fs-3 p-2  `}
        >
          Factorización
        </Link>
      </nav>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary text-uppercase fs-4 fw-bold py-3"
      >
        Actualizar Perfil
      </button>
    </div>
  );
};
