import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Dashboard } from "../dashboard/Dashboard";
import { Spinner } from "../dashboard/Spinner";
import { ModalData } from "../ModalData";

export const RouteProtected = () => {
  const { auth, checking } = useAuth();

  if (checking) return <Spinner />;
  return (
    <>
      {auth._id ? (
        <>
          <ModalData />
          <Dashboard />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
