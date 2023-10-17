import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Dashboard } from "../dashboard/Dashboard";
import { Spinner } from "../dashboard/Spinner";
import { ModalData } from "../ModalData";
import { useProfile } from "../../hooks/useProfile";

export const RouteProtected = () => {
  const { auth, checking } = useAuth();
  const { modalCompletado } = useProfile();
  if (checking) return <Spinner />;
  return (
    // <>
    //   {auth._id ? (
    //     <>
    //       {!modalCompletado && <ModalData />}
    //       <Dashboard />
    //     </>
    //   ) : (
    //     <Navigate to="/" />
    //   )}
    // </>
    <>
      {!modalCompletado && <ModalData />}
      <Dashboard />
    </>
  );
};
