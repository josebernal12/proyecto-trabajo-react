import { ConfirmAccount} from "./components/alertaGreat/ConfirmAccount";
import { ChangePassword } from "./components/auth/ChangePassword";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { Login } from "./components/auth/Login";
// import { Dashboard } from "./components/dashboard/Dashboard";
import { Form } from "./components/layout/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { RouteProtected } from "./components/layout/RouteProtected";
import { Prueba } from "./Prueba/Prueba";
import { Prueba2 } from "./Prueba/Prueba2";
import { CreateAccount } from "./components/auth/CreateAccount";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}>
            <Route index element={<Login />} />
            <Route path="/registrar" element={<CreateAccount />} />
            <Route path="/confirmar-cuenta/:token" element={<ConfirmAccount />} />
            <Route path="/olvide-password" element={<ForgotPassword />} />
            <Route
              path="/olvide-password/:token"
              element={<ChangePassword />}
            />
          </Route>
          <Route path="/dashboard" element={<RouteProtected />}>
            <Route path="/dashboard/prueba" element={<Prueba />} />
            <Route path="/dashboard/prueba2" element={<Prueba2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
