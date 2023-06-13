import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../../config/clientAxios";
import { AlertaGreat } from "./AlertaGreat";
import { OneError } from "../errors/OneError";

export const ConfirmAccount = () => {
  const params = useParams();
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const { token } = params;
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios(`/token/${token}`);
        setAlert(data.msg);
        setConfirmar(true);
      } catch (error) {
        setAlert("");
        setConfirmar("");
        setError(error.response.data.msg);
      }
    };
    return () => {
      confirmAccount();
    };
  }, []);
  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded p-5 mt-5">
      <div className=" d-flex flex-column align-items-center  ">
        {alert && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-person-check-fill mb-5"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <AlertaGreat alertBgGreen={alert} />
          </>
        )}
        {error && <OneError alert={error} />}
      </div>
      <div className="d-flex">
        {confirmar && (
          <Link
            to={"/"}
            className="btn btn-success text-uppercase fs-4 mx-auto mt-5 px-5 "
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
};
