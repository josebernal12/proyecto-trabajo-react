import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useProfile } from "../../hooks/useProfile";
import { OneError } from "../errors/OneError";

const Wizard = () => {
  const { auth } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [fechaConstitucion, setFechaConstitucion] = useState("");
  const [clavePais, setClavePais] = useState("");

  const [claveLargaDistancia, setClaveLargaDistancia] = useState("");
  const [numeroTelefonico, setNumeroTelefonico] = useState("");
  const [numeroMovil, setNumeroMovil] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [claveUnica, setClaveUnica] = useState("");
  const [clavePaisNacionalidad, setClavePaisNacionalidad] = useState("");
  const [clavePaisNacimiento, setClavePaisNacimiento] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  // const [entidadFederativa, setEntidadFederativa] = useState("");
  // const [delegacion, setDelegacion] = useState("");
  // const [localidad, setLocalidad] = useState("");
  const [colonia, setColonia] = useState("");
  const [tipoVialidad, setTipoVialidad] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [actividadVulnerable, setActividadVulnerable] = useState("");
  const [actividadVulnerableRealizada, setActividadVulnerableRealizada] =
    useState("");
  const [existeValor, setExisteValor] = useState(false);
  const [error, setError] = useState("");

  const {
    states,
    cargando,
    setCargando,
    setValorState,
    municipios,
    setValorMunicipio,
    valorMunicipio,
    AddActividadVulnerable,
    valorState,
    addProfile,
    setModalCompletado,
  } = useProfile();
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const changeActividadVulnerable = (e) => {
    e.preventDefault();
    setExisteValor(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.persona === "M") {
      if (
        ![
          fechaConstitucion,
          clavePaisNacionalidad,
          claveLargaDistancia,
          numeroTelefonico,
          numeroMovil,
        ].includes(" ")
      ) {
        await addProfile({
          fechaConstitucion,
          clavePaisNacionalidad,
          claveLargaDistancia,
          numeroTelefonico,
          numeroMovil,
          usuario: auth._id,
        });
        setModalCompletado(true);
      } else {
        setError("todos los campos son obligatorios");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
    if (auth.persona === "F") {
      if (
        ![
          fechaNacimiento,
          claveUnica,
          clavePaisNacimiento,
          clavePaisNacionalidad,
          claveLargaDistancia,
          numeroTelefonico,
          numeroMovil,
        ].includes("")
      ) {
        await addProfile({
          fechaNacimiento,
          claveUnica,
          clavePaisNacimiento,
          clavePaisNacionalidad,
          claveLargaDistancia,
          numeroTelefonico,
          numeroMovil,
          usuario: auth._id,
        });
        setModalCompletado(true);
      } else {
        setError("todos los campos son obligatorios");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      // setError("");
    }
  };

  const handleAgregarDomicilio = async (e) => {
    e.preventDefault();

    if (
      [
        codigoPostal,
        valorMunicipio,
        valorState,
        colonia,
        tipoVialidad,
        calle,
        numeroExterior,
        numeroInterior,
        actividadVulnerable,
        actividadVulnerableRealizada,
      ].includes("")
    ) {
      setError("todos los campos son obligatorios");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Domilicio Agregado!",
      showConfirmButton: false,
      timer: 1500,
    });
    await AddActividadVulnerable({
      actividadVulnerableRealizada,
      codigoPostal,
      valorState,
      valorMunicipio,
      // localidad,
      colonia,
      tipoVialidad,
      calle,
      numeroExterior,
      numeroInterior,
      actividadVulnerable,
      usuario: auth._id,
    });
    setExisteValor(false);
    setActividadVulnerableRealizada("");
    setCodigoPostal("");
    setColonia("");
    setTipoVialidad("");
    setCalle("");
    setNumeroExterior("");
    setNumeroInterior("");
    setActividadVulnerable("");
  };

  if (municipios.municipios) {
    setCargando(true);
  }

  return (
    <>
      <>
        <div>
          {error && <OneError alert={error} />}
          <nav className="nav d-flex justify-content-evenly mb-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`${
                currentStep === 1
                  ? "fs-4 nav-link text-dark bg-primary text-white rounded"
                  : "fs-4 nav-link text-dark"
              } `}
            >
              Datos de Persona
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`${
                currentStep === 2
                  ? "fs-4 nav-link text-dark bg-primary text-white rounded"
                  : "fs-4 nav-link text-dark"
              } `}
            >
              Contacto
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`${
                currentStep === 3
                  ? "fs-4 nav-link text-dark bg-primary text-white rounded"
                  : "fs-4 nav-link text-dark"
              } `}
            >
              Datos de la actividad vulnerable
            </button>
          </nav>
          <h1 className="text-center">Wizard</h1>
          {currentStep === 1 && (
            <div>
              <div>
                {/* <h2>Paso 1</h2> */}
                {auth.persona === "F" ? (
                  <>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Clave Única de Registro de Población
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg py-3"
                        value={claveUnica}
                        onChange={(e) => setClaveUnica(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5 ">
                        Clave país de nacionalidad
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg py-3"
                        value={clavePaisNacionalidad}
                        onChange={(e) =>
                          setClavePaisNacionalidad(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Clave país de nacimiento
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg py-3"
                        value={clavePaisNacimiento}
                        onChange={(e) => setClavePaisNacimiento(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de Constitución
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaConstitucion}
                        onChange={(e) => setFechaConstitucion(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5 ">
                        Clave país de nacionalidad
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg py-3"
                        value={clavePaisNacionalidad}
                        onChange={(e) =>
                          setClavePaisNacionalidad(e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2>Paso 2</h2>
              <div className="mt-3">
                <label htmlFor="clave" className="form-label fs-5">
                  Clave de larga distancia
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg py-3"
                  id="clave"
                  value={claveLargaDistancia}
                  onChange={(e) => setClaveLargaDistancia(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="numero" className="form-label fs-5 ">
                  Número de teléfono
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg py-3"
                  id="numero"
                  value={numeroTelefonico}
                  onChange={(e) => setNumeroTelefonico(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="numero-movil" className="form-label fs-5 ">
                  Número de teléfono móvil
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg py-3"
                  id="numero-movil"
                  value={numeroMovil}
                  onChange={(e) => setNumeroMovil(e.target.value)}
                />
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2>Paso 3</h2>
              <button
                type="button"
                onClick={changeActividadVulnerable}
                className="btn btn-primary text-uppercase  fs-4 mb-4"
              >
                Agregar Domicilio
              </button>
              {existeValor && (
                <>
                  <label
                    htmlFor="actividad-vulnerable"
                    className="d-block form-label fs-5"
                  >
                    Actividad Vulnerable Realizada
                  </label>
                  <select
                    className="form-control form-control-lg"
                    defaultValue="seleccion"
                    onChange={(e) =>
                      setActividadVulnerableRealizada(e.target.value)
                    }
                  >
                    <option value="seleccion" disabled>
                      -- Seleccione --
                    </option>
                    <option value="construccion">Construcción</option>
                    <option value="notario">Notario</option>
                  </select>
                  <div className="mt-3">
                    <label htmlFor="codigo-postal" className="form-label fs-5 ">
                      Código Postal
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg py-3"
                      id="codigo-postal"
                      value={codigoPostal}
                      onChange={(e) => setCodigoPostal(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="entidad-federativa"
                      className="form-label fs-5 "
                    >
                      Entidad Federativa
                    </label>
                    <select
                      name=""
                      id="entidad-federativa"
                      className="form-control form-control-lg"
                      defaultValue="seleccion"
                      onChange={(e) => setValorState(e.target.value)}
                    >
                      <option value="seleccion" disabled>
                        -- Seleccione --
                      </option>
                      {states.map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  {cargando && (
                    <div className="mt-3">
                      <label htmlFor="delegacion" className="form-label fs-5 ">
                        Delegación o Municipio
                      </label>
                      <select
                        name=""
                        id="delegacion"
                        className="form-control form-control-lg"
                        onChange={(e) => setValorMunicipio(e.target.value)}
                      >
                        {municipios.municipios.map((municipio) => (
                          <option key={municipio.clave}>
                            {municipio.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {valorMunicipio && (
                    <div className="mt-3">
                      <label htmlFor="localidad" className="form-label fs-5 ">
                        Localidad
                      </label>
                      <select
                        name=""
                        id="delegacion"
                        className="form-control form-control-lg"
                      >
                        {/* {localidadForm.map(localidadState => {
                          <option
                        })} */}
                      </select>
                    </div>
                  )}
                  <div className="mt-3">
                    <label htmlFor="colonia" className="form-label fs-5 ">
                      Colonia
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="colonia"
                      value={colonia}
                      onChange={(e) => setColonia(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="tipo-vialidad" className="form-label fs-5 ">
                      Tipo de vialidad
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="tipo-vialidad"
                      value={tipoVialidad}
                      onChange={(e) => setTipoVialidad(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="calle" className="form-label fs-5 ">
                      Calle, avenida o vía
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="calle"
                      value={calle}
                      onChange={(e) => setCalle(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="numero-exterior"
                      className="form-label fs-5 "
                    >
                      Número exterior
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="numero-exterior"
                      value={numeroExterior}
                      onChange={(e) => setNumeroExterior(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="numero-interior"
                      className="form-label fs-5 "
                    >
                      Número Interior
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="numero-interior"
                      value={numeroInterior}
                      onChange={(e) => setNumeroInterior(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="actividad-vulnerable"
                      className="form-label fs-5 "
                    >
                      Actividad vulnerable realizada en el domicilio
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="actividad-vulnerable"
                      value={actividadVulnerable}
                      onChange={(e) => setActividadVulnerable(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-warning mt-3 uppercase fs-4"
                    value="Agregar Domicilio"
                    onClick={handleAgregarDomicilio}
                  />
                </>
              )}
            </div>
          )}
          <div className="d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                className="mt-4 btn btn-primary fs-3"
                onClick={handlePrevious}
              >
                Anterior
              </button>
            )}
            {currentStep < 3 && (
              <button
                className="mt-4 btn btn-primary  fs-3 "
                onClick={handleNext}
              >
                Siguiente
              </button>
            )}
            {currentStep === 3 && (
              <button
                className="mt-4 btn btn-primary  fs-3 "
                onClick={handleSubmit}
              >
                Enviar
              </button>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Wizard;
