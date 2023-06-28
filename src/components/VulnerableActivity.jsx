import { useLocation, Link } from "react-router-dom";

export const VulnerableActivity = () => {
  const location = useLocation();
  return (
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
        <Link
          to={"/dashboard/configurar-perfil/colaboradores"}
          className={`${
            location.pathname ===
            "/dashboard/configurar-perfil/colaboradores"
              ? "bg-primary text-white  rounded"
              : ""
          } nav-link fs-3 p-2  `}
        >
          Colaboradores
        </Link>
      </nav>
      <button className="btn btn-primary text-uppercase fs-4 fw-bold py-3">
        Actualizar Perfil
      </button>
    </div>
  );
};
