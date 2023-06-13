/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const autheticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setChecking(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("/dashboard", config);
        setAuth(data)
      } catch (error) {
        console.log(error.response)
        setAuth({});
        console.log(error);
      }
      setChecking(false);
    };
    autheticateUser();
  }, []);
  return (
    <AuthContext.Provider value={{ setAuth, auth, checking }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
