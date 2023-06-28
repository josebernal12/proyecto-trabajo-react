/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/clientAxios";
import { useConfig } from "../hooks/useConfig";
import { useAuth } from "../hooks/useAuth";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const config = useConfig();
  const [profile, setProfile] = useState({});
  // const [valoresState, setValoresState] = useState([]);
  const [AllactividadVulnerable, setAllActividadVulnerable] = useState([]);
  const [states, setStates] = useState([]);
  const [valorState, setValorState] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [valorMunicipio, setValorMunicipio] = useState("");
  const [modalCompletado, setModalCompletado] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  // const [localidades, setLocalidades] = useState([])
  const [cargando, setCargando] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    const consultApi = async () => {
      const { data } = await clientAxios("/perfil/estados");
      const estados = data.map((state) => {
        return state.nombre;
      });
      // setValoresState(data);
      // setMunicipios(municipiosBD);
      setStates(estados);
    };

    consultApi();
  }, []);
  const submitProfile = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (valorState !== "") {
      const consultApi = async () => {
        const { data } = await clientAxios.post("/perfil/municipios", {
          nombre: valorState,
        });
        setMunicipios(data);
      };
      consultApi();
    }
  }, [valorState]);

  useEffect(() => {
    const consultApi = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios("/perfil/obtener-perfil", config);
      if (data) {
        setProfile(data);
        setModalCompletado(true);
        return;
      }
      setModalCompletado(false);
    };
    consultApi();
  }, []);

  useEffect(() => {
    const consultApi = async () => {
      try {
        const { data } = await clientAxios("/perfil/colaborador", config);
        setColaboradores(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    consultApi();
  }, [auth]);
  useEffect(() => {
    const consultApi = async () => {
      try {
        const { data } = await clientAxios(
          "/perfil/actividad-vulnerable",
          config
        );
        setAllActividadVulnerable(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    consultApi();
  }, [auth]);

  const AddActividadVulnerable = async (info) => {
    const {
      actividadVulnerable,
      actividadVulnerableRealizada,
      calle,
      codigoPostal,
      colonia,
      numeroExterior,
      numeroInterior,
      tipoVialidad,
      valorMunicipio,
      valorState,
      usuario,
    } = info;
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clientAxios.post(
      "/perfil/actividad-vulnerable",
      {
        actividadVulnerableRealizada,
        codigoPostal,
        entidadFederativa: valorState,
        municipio: valorMunicipio,
        colonia,
        tipoVialidad,
        calle,
        numeroExterior,
        numeroInterior,
        actividadVulnerableRealizadaEnElDomicilio: actividadVulnerable,
        usuario,
      },
      config
    );
    console.log(data);
    setAllActividadVulnerable([...AllactividadVulnerable, data]);
  };
  const addProfile = async (info) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clientAxios.post("/perfil", info, config);
    console.log(data);
  };
  const addCollaborators = async (infoCollaborator) => {
    try {
      const { data } = await clientAxios.post(
        "/perfil/colaborador",
        infoCollaborator,
        config
      );
      setColaboradores([data, ...colaboradores]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProfileContext.Provider
      value={{
        submitProfile,
        states,
        setCargando,
        cargando,
        setValorState,
        valorState,
        municipios,
        setValorMunicipio,
        valorMunicipio,
        AddActividadVulnerable,
        addProfile,
        setModalCompletado,
        modalCompletado,
        profile,
        addCollaborators,
        colaboradores,
        AllactividadVulnerable,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };

export default ProfileContext;
