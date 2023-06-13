import { useState } from "react";
import { OneError } from "../errors/OneError";
import clientAxios from "../../config/clientAxios";
import { AlertaGreat } from "../alertaGreat/AlertaGreat";
import emailjs from "emailjs-com";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("el email es obligatorio");
    }

    try {
      const { data } = await clientAxios.post("/olvide-password", { email });
      setError("");
      setAlert("Te hemos enviado un email, sigue las instrucciones");
      const templateParams = {
        to_name: email,
        email: email,
        from_name: "procrecer",
        message: `${email} has solicitado reestablecer tu password presiona el siguiente enlace `,
        my_html: `<a href=http://localhost:5173/olvide-password/${data.msg.token}>Confirmar Cuenta</a>`,
      };

      emailjs
        .send(
          "service_d1wwsmi",
          "template_sc614hq",
          templateParams,
          "Xz919CCqbZ5omJBF_"
        )
        .then(
          function (response) {
            console.log("SUCCESS", response, response.status, response.text);
          },
          function (error) {
            console.log("Faileed", error);
          }
        );
    } catch (error) {
      setAlert("");
      setError(error.response.data.msg);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" shadow p-3 mb-5 bg-body-tertiary rounded p-5  "
    >
      {error && <OneError alert={error} />}
      {alert && <AlertaGreat alertBgGreen={alert} />}
      <div className="d-flex flex-column align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          fill="currentColor"
          className="bi bi-envelope-check-fill"
          viewBox="0 0 16 16"
        >
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
          <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
        </svg>
        <h2 className="my-4 text-center ">¿Olvidaste la contraseña?</h2>
        <p className="my-4 text-center fs-4 ">
          Inicia el proceso de recuperación de contraseña{" "}
        </p>
      </div>
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
      <input
        type="submit"
        className="btn btn-success my-5 fs-3 w-100"
        value="Reestablecer Password"
      />
    </form>
  );
};
