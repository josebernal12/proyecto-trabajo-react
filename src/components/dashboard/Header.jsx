import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { auth } = useAuth();

  return (
    <header>
      <h1 className="p-4 text-center">Hola! {auth.contribuyente}</h1>
    </header>
  );
};
