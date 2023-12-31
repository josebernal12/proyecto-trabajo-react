/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/clientAxios";
import { useConfig } from "../hooks/useConfig";
import { useAuth } from "../hooks/useAuth";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const config = useConfig();
  const [profile, setProfile] = useState({});
  const [existProfile, setExistProfile] = useState(false);
  const [AllactividadVulnerable, setAllActividadVulnerable] = useState([]);
  const [actividadVulnerable, setActividadVulnerable] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [states, setStates] = useState([]);
  const [valorState, setValorState] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [valorMunicipio, setValorMunicipio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalCompletado, setModalCompletado] = useState(false);
  const [modalVerActividadVulnerable, setModalVerActividadVulnerable] =
    useState(false);
  const [modalVerColaboradores, setModalVerColaboradores] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    const consultApi = async () => {
      const { data } = await clientAxios("/perfil/estados");
      const estados = data.map((state) => {
        return state.nombre;
      });

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
  }, [auth]);

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
    setAllActividadVulnerable([...AllactividadVulnerable, data]);
  };
  const updateActividadVulnerable = async (infoActividad, id) => {
    try {
      // console.log(infoActividad);
      const { data } = await clientAxios.put(
        `/perfil/actividad-vulnerable/${id}`,
        infoActividad,
        config
      );
      const actividadUpdate = AllactividadVulnerable.map((actividadState) =>
        actividadState._id === data._id ? data : actividadState
      );
      setAllActividadVulnerable(actividadUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteActividadVulnerable = async (id) => {
    try {
      const { data } = await clientAxios.delete(
        `/perfil/actividad-vulnerable/${id}`,
        config
      );
      const actividadVulnerableActualizada = AllactividadVulnerable.filter(
        (actividadState) => actividadState._id !== data._id
      );
      setAllActividadVulnerable(actividadVulnerableActualizada);
    } catch (error) {
      console.log(error);
    }
  };
  const updateColaboradorBD = async (id, colaborador) => {
    console.log(colaborador);
    try {
      const { data } = await clientAxios.put(
        `/perfil/colaborador/${id}`,
        colaborador,
        config
      );
      const colaboradorUpdate = colaboradores.map((col) =>
        col._id === data._id ? data : col
      );
      setColaboradores(colaboradorUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteColaborador = async (id) => {
    try {
      const { data } = await clientAxios.delete(
        `/perfil/colaborador/${id}`,
        config
      );
      const colaboradoresActualizada = colaboradores.filter(
        (colaboradorState) => colaboradorState._id !== data._id
      );
      console.log(data);
      setColaboradores(colaboradoresActualizada);
    } catch (error) {
      console.log(error);
    }
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
    setProfile(data);
  };
  const updateProfile = async (info, id) => {
    try {
      const { data } = await clientAxios.put(`/perfil/${id}`, info, config);
      setProfile(data);
      setModalCompletado(true);
    } catch (error) {
      console.log(error);
    }
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
        updateProfile,
        setModalCompletado,
        modalCompletado,
        profile,
        addCollaborators,
        colaboradores,
        AllactividadVulnerable,
        showModal,
        setShowModal,
        updateActividadVulnerable,
        deleteActividadVulnerable,
        deleteColaborador,
        updateColaboradorBD,
        setExistProfile,
        existProfile,
        setModalVerActividadVulnerable,
        modalVerActividadVulnerable,
        setModalVerColaboradores,
        modalVerColaboradores,
        setActividadVulnerable,
        actividadVulnerable,
        setColaborador,
        colaborador,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };

export default ProfileContext;
