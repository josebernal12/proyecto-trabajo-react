import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../../config/clientAxios";
import { OneError } from "../errors/OneError";
import { AlertaGreat } from "../alertaGreat/AlertaGreat";

export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const changePassword = async () => {
      try {
        await clientAxios(`/cambiar-password/${token}`);

        setTokenValido(true);
      } catch (error) {
        console.log("entre");
        console.log(error);
        setError(error.response.data.msg);
      }
    };

    return () => {
      changePassword();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([password, confirmarPassword].includes("")) {
      return setError("Los campos son obligatorios");
    }
    if (password !== confirmarPassword) {
      return setError("Los passwords son diferentes");
    }

    setError("");
    try {
      const { data } = await clientAxios.post(`cambiar-password/${token}`, {
        password,
      });
      setAlert(data.msg);
      setError("");
      setPasswordChange(true);
    } catch (error) {
      console.log(error.response.data);
      setAlert("");
      setError(error.response.data.msg);
    }
  };
  return (
    <>
      {error && <OneError alert={error} />}
      {alert && <AlertaGreat alertBgGreen={alert} />}
      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className=" shadow p-3 mb-5 bg-body-tertiary rounded p-5  "
        >
          <p className="my-4 text-center fs-3">Cambiar Contraseña</p>
          <div className="campo">
            <label htmlFor="password" className="form-label fs-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="campo mt-3">
            <label htmlFor="repetir-password" className="form-label fs-3">
              Confirmar Password
            </label>
            <input
              type="password"
              id="repetir-password"
              className="form-control form-control-lg"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-success my-5 fs-3 w-100"
            value="Guardar Cambios"
          />
        </form>
      )}
      <div className="d-flex" >
      {passwordChange && (
        <Link
          to={"/"}
          className="btn btn-success text-uppercase fs-4 mx-auto px-5 "
        >
          Iniciar Sesión
        </Link>
      )}
      </div>
    </>
  );
};
