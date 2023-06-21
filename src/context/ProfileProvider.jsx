/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/clientAxios";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  // const [profile, setProfile] = useState({});
  const [valoresState, setValoresState] = useState([]);
  const [states, setStates] = useState([]);
  const [valorState, setValorState] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [valorMunicipio, setValorMunicipio] = useState("")
  const [localidades, setLocalidades] = useState([])
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    const consultApi = async () => {
      const { data } = await clientAxios("/perfil/estados");
      const estados = data.map((state) => {
        return state.nombre;
      });
      setValoresState(data);
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
        valorMunicipio
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };

export default ProfileContext;
