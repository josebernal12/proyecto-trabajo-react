import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useProfile } from "../../hooks/useProfile";
import { OneError } from "../errors/OneError";
import { Collaborators } from "../Collaborators";
import { Address } from "../Address";

const Wizard = () => {
  const { auth } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  const [fechaConstitucion, setFechaConstitucion] = useState("");

  const [claveLargaDistancia, setClaveLargaDistancia] = useState("");
  const [numeroTelefonico, setNumeroTelefonico] = useState("");
  const [numeroMovil, setNumeroMovil] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [claveUnica, setClaveUnica] = useState("");
  const [clavePaisNacionalidad, setClavePaisNacionalidad] = useState("");
  const [clavePaisNacimiento, setClavePaisNacimiento] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [colonia, setColonia] = useState("");
  const [tipoVialidad, setTipoVialidad] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [actividadVulnerable, setActividadVulnerable] = useState("");
  const [actividadVulnerableRealizada, setActividadVulnerableRealizada] =
    useState("");
  const [folio, setFolio] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaInicioAmparo, setFechaInicioAmparo] = useState("");
  const [fechaTerminoAmparo, setFechaTerminoAmparo] = useState("");
  const [agregarColaborador, setAgregarColaborador] = useState(false);
  const [existUpdate, setExistUpdate] = useState({
    id: "",
    type: false,
  });
  const [existeValor, setExisteValor] = useState(false);
  const [error, setError] = useState("");
  const [updateColaborador, setUpdateColaborador] = useState({
    colaborador: "",
    type: false,
  });
  const [colaborador, setColaborador] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    rfc: "",
    clave_unica: "",
    clave_pais: "",
    fecha_designacion: "",
    usuario: auth._id,
  });
  const handleColaborador = (e) => {
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
      usuario: auth._id,
    });
  };

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
    addCollaborators,
    colaboradores,
    AllactividadVulnerable,
    updateActividadVulnerable,
    updateColaboradorBD,
    profile,
    updateProfile,
    existProfile,
  } = useProfile();
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const changeActividadVulnerable = (e, actividad) => {
    e.preventDefault();
    setActividadVulnerableRealizada("");
    setActividadVulnerable("");
    setTipoVialidad("");
    setCodigoPostal("");
    setColonia("");
    setValorState("");
    setValorMunicipio("");
    setCalle("");
    setNumeroExterior("");
    setNumeroInterior("");
    setExistUpdate(false);
    if (actividad?._id) {
      setActividadVulnerableRealizada(actividad.actividadVulnerableRealizada);
      setCodigoPostal(actividad.codigoPostal);
      setValorState(actividad.entidadFederativa);
      setValorMunicipio(actividad.municipio);
      setColonia(actividad.colonia);
      setTipoVialidad(actividad.tipoVialidad);
      setCalle(actividad.calle);
      setNumeroExterior(actividad.numeroExterior);
      setNumeroInterior(actividad.numeroInterior);
      setActividadVulnerable(
        actividad.actividadVulnerableRealizadaEnElDomicilio
      );
      setExistUpdate({
        id: actividad._id,
        type: true,
      });
    }
    setExisteValor(true);
  };

  useEffect(() => {
    if (existProfile) {
      if (auth.persona === "F") {
        setFechaNacimiento(profile.fechaNacimiento);
        setClaveUnica(profile.ClaveUnica);
        setClavePaisNacionalidad(profile.clavePaisNacionalidad);
        setClavePaisNacionalidad(profile.clavePaisNacimiento);
        setFechaEmision(profile.fechaEmision?.split("T")[0]);
        setFechaInicioAmparo(profile.fechaInicioAmparo?.split("T")[0]);
        setFechaTerminoAmparo(profile.fechaTerminoAmparo?.split("T")[0]);
        setFolio(profile.folio);
        setClaveLargaDistancia(profile.claveLargaDistancia);
        setNumeroMovil(profile.numeroMovil);
        setNumeroTelefonico(profile.numeroTelefonico);
      } else {
        setClaveLargaDistancia(profile.claveLargaDistancia);
        setClavePaisNacionalidad(profile.clavePaisNacionalidad);
        setFechaConstitucion(profile.fechaConstitucion);
        setFechaEmision(profile.fechaEmision?.split("T")[0]);
        setFechaInicioAmparo(profile.fechaInicioAmparo?.split("T")[0]);
        setFechaTerminoAmparo(profile.fechaTerminoAmparo?.split("T")[0]);
        setFolio(profile.folio);
        setNumeroMovil(profile.numeroMovil);
        setNumeroTelefonico(profile.numeroTelefonico);
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.persona === "M") {
      if (
        [
          fechaConstitucion,
          clavePaisNacionalidad,
          claveLargaDistancia,
          numeroTelefonico,
          numeroMovil,
          folio,
          fechaEmision,
          fechaInicioAmparo,
          fechaTerminoAmparo,
        ].includes("")
      ) {
        setError("todos los campos son obligatorios");
        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }
      if (profile._id) {
        await updateProfile(
          {
            fechaConstitucion,
            clavePaisNacionalidad,
            claveLargaDistancia,
            numeroTelefonico,
            numeroMovil,
            folio,
            fechaEmision,
            fechaInicioAmparo,
            fechaTerminoAmparo,
            usuario: auth._id,
          },
          profile._id
        );
        return;
      }
      await addProfile({
        fechaConstitucion,
        clavePaisNacionalidad,
        claveLargaDistancia,
        numeroTelefonico,
        numeroMovil,
        folio,
        fechaEmision,
        fechaInicioAmparo,
        fechaTerminoAmparo,
        usuario: auth._id,
      });
      setModalCompletado(true);
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
          folio,
          fechaEmision,
          fechaInicioAmparo,
          fechaTerminoAmparo,
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
          folio,
          fechaEmision,
          fechaInicioAmparo,
          fechaTerminoAmparo,
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

    if (existUpdate.type) {
      await updateActividadVulnerable(
        {
          actividadVulnerableRealizada,
          codigoPostal,
          entidadFederativa: valorState,
          municipio: valorMunicipio,
          // localidad,
          colonia,
          tipoVialidad,
          calle,
          numeroExterior,
          numeroInterior,
          actividadVulnerable,
          usuario: auth._id,
        },
        existUpdate.id
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Domilicio Actualizado!",
        showConfirmButton: false,
        timer: 1500,
      });
      setExisteValor(false);
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
  const handleAgregarColaborador = async () => {
    if (Object.values(colaborador).includes("")) {
      setError("todos los campos son obligatorios");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (updateColaborador.type) {
      await updateColaboradorBD(updateColaborador.colaborador._id, colaborador);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Colaborador Actualizado!",
        showConfirmButton: false,
        timer: 1500,
      });
      setAgregarColaborador(false);

      return;
    }
    await addCollaborators(colaborador);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Colaborador Agregado!",
      showConfirmButton: false,
      timer: 1500,
    });
    setAgregarColaborador(false);
    setColaborador({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      rfc: "",
      clave_unica: "",
      clave_pais: "",
      fecha_designacion: "",
    });
  };
  const handleColaboradores = (colaborador) => {
    setAgregarColaborador(true);
    console.log(colaborador)
    setColaborador({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_nacimiento: "",
      rfc: "",
      clave_unica: "",
      clave_pais: "",
      fecha_designacion: "",
      usuario: auth._id,
    });
    setUpdateColaborador({
      colaborador: "",
      type: false,
    });
    if (colaborador._id) {
      setColaborador({
        nombre: colaborador.nombre,
        apellido_paterno: colaborador.apellido_paterno,
        apellido_materno: colaborador.apellido_materno,
        fecha_nacimiento: colaborador.fecha_nacimiento,
        rfc: colaborador.rfc,
        clave_unica: colaborador.clave_unica,
        clave_pais: colaborador.clave_pais,
        fecha_designacion: colaborador.fecha_designacion,
        usuario: auth._id,
      });
      setUpdateColaborador({
        colaborador: colaborador,
        type: true,
      });
    }
  };
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
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className={`${
                currentStep === 4
                  ? "fs-4 nav-link text-dark bg-primary text-white rounded"
                  : "fs-4 nav-link text-dark"
              } `}
            >
              encargado del cumplimiento
            </button>
          </nav>
          {currentStep === 1 && (
            <div>
              <div>
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
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Numero o Folio
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg py-3"
                        value={folio}
                        onChange={(e) => setFolio(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de Emision
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaEmision}
                        onChange={(e) => setFechaEmision(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de inicio del periodo que ampara
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaInicioAmparo}
                        onChange={(e) => setFechaInicioAmparo(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de termino del periodo que ampara
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaTerminoAmparo}
                        onChange={(e) => setFechaTerminoAmparo(e.target.value)}
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
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Numero o Folio
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg py-3"
                        value={folio}
                        onChange={(e) => setFolio(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de Emision
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaEmision}
                        onChange={(e) => setFechaEmision(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de inicio del periodo que ampara
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaInicioAmparo}
                        onChange={(e) => setFechaInicioAmparo(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fecha" className="form-label fs-5">
                        Fecha de termino del periodo que ampara
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg py-3"
                        value={fechaTerminoAmparo}
                        onChange={(e) => setFechaTerminoAmparo(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
             
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
              <button
                type="button"
                onClick={changeActividadVulnerable}
                className="btn btn-primary text-uppercase  fs-4 mb-4"
              >
                Agregar Domicilio
              </button>
              {AllactividadVulnerable.length > 0 ? (
                <Address
                  changeActividadVulnerable={changeActividadVulnerable}
                />
              ) : null}
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
                    value={actividadVulnerableRealizada || "seleccion"}
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
                      value={valorState || "seleccion"}
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
                        value={valorMunicipio || "seleccion"}
                        className="form-control form-control-lg"
                        onChange={(e) => setValorMunicipio(e.target.value)}
                      >
                        <option value="seleccion" disabled>
                          -- Seleccione --
                        </option>
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
                    value={`${
                      existUpdate.type
                        ? "Actualizar Actividad Vulnerable"
                        : "Agregar Domicilio"
                    }`}
                    onClick={handleAgregarDomicilio}
                  />
                </>
              )}
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <button
                type="button"
                onClick={handleColaboradores}
                className="btn btn-primary text-uppercase mt-3  fs-4 mb-4"
              >
                Agregar Colaborador
              </button>

              {colaboradores.length ? (
                <Collaborators handleColaboradores={handleColaboradores} />
              ) : null}

              {agregarColaborador && (
                <>
                  <div className="mt-3">
                    <label
                      htmlFor="nombre-colaborador"
                      className="form-label fs-5 "
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="nombre-colaborador"
                      value={colaborador.nombre}
                      name="nombre"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="apellido-paterno-colaborador"
                      className="form-label fs-5 "
                    >
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="apellido-paterno-colaborador"
                      value={colaborador.apellido_paterno}
                      name="apellido_paterno"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="apellido-materno-colaborador"
                      className="form-label fs-5 "
                    >
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="apellido-materno-colaborador"
                      value={colaborador.apellido_materno}
                      name="apellido_materno"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="fecha-nacimiento-colaborador"
                      className="form-label fs-5 "
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg py-3"
                      id="fecha-nacimiento-colaborador"
                      value={colaborador.fecha_nacimiento}
                      name="fecha_nacimiento"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="registro-colaborador"
                      className="form-label fs-5 "
                    >
                      RFC
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="registro-colaborador"
                      value={colaborador.rfc}
                      name="rfc"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="clave-unica-colaborador"
                      className="form-label fs-5 "
                    >
                      Clave Única de Registro de Población
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="clave-unica-colaborador"
                      value={colaborador.clave_unica}
                      name="clave_unica"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="clave-pais-colaborador"
                      className="form-label fs-5 "
                    >
                      Clave país de nacionalidad
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg py-3"
                      id="clave-pais-colaborador"
                      value={colaborador.clave_pais}
                      name="clave_pais"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="fecha-designacion-colaborador"
                      className="form-label fs-5 "
                    >
                      Fecha de designación
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg py-3"
                      id="fecha-designacion-colaborador"
                      value={colaborador.fecha_designacion}
                      name="fecha_designacion"
                      onChange={(e) => handleColaborador(e)}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-warning mt-3 uppercase fs-4"
                    value={`${
                      updateColaborador.type
                        ? "Actualizar Colaborador"
                        : "Agregar Colaborador"
                    }`}
                    onClick={handleAgregarColaborador}
                  />
                </>
              )}
            </div>
          )}
          <div className="d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                className="mt-4 btn btn-primary fs-4"
                onClick={handlePrevious}
              >
                Anterior
              </button>
            )}
            {currentStep <= 3 && (
              <button
                className="mt-4 btn btn-primary  fs-4 "
                onClick={handleNext}
              >
                Siguiente
              </button>
            )}
            {currentStep === 4 && (
              <button
                className="mt-4 btn btn-primary  fs-4 "
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
