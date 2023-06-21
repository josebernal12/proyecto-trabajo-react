import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { auth } = useAuth();

  return (
    <header>
      <h1 className="p-4 text-left">Hola! {auth.contribuyente}</h1>
      {/* <p className="text-center fs-3">Usuario Principal</p>
      <h1 className="p-4 text-center">{auth.email}</h1> */}
    </header>
  );
};
