import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OneError } from "../errors/OneError";
import clientAxios from "../../config/clientAxios";
import { useAuth } from "../../hooks/useAuth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    try {
      const { data } = await clientAxios.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      setAuth(data);
     navigate('/dashboard')
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" shadow p-3 mb-5 bg-body-tertiary rounded p-5  "
      >
        {error && <OneError alert={error} />}
        <p className="my-4 text-center fs-4">Iniciar Sesión</p>
        <div className="campo">
          <label htmlFor="email" className="form-label fs-3">
            Email
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="campo mt-3">
          <label htmlFor="email" className="form-label fs-3">
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-success my-5 fs-3 w-100"
          value="Iniciar Sesión"
        />
        <div className="d-flex flex-column gap-4 align-items-center">
          <Link
            to={"/registrar"}
            className="text-decoration-none text-dark fs-4"
          >
            ¿No tienes una cuenta? Crear una
          </Link>
          <Link
            to={"/olvide-password"}
            className="text-decoration-none text-dark fs-4"
          >
            ¿Olvidaste tu Password? Reestablecer Password
          </Link>
        </div>
      </form>
 
    </>
  );
};
