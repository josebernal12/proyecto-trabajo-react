import { ConfirmAccount } from './components/alertaGreat/ConfirmAccount'
import { ChangePassword } from './components/auth/ChangePassword'
import { ForgotPassword } from './components/auth/ForgotPassword'
import { Login } from './components/auth/Login'
// import { Dashboard } from "./components/dashboard/Dashboard";
import { Form } from './components/layout/Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { RouteProtected } from './components/layout/RouteProtected'
import { CreateAccount } from './components/auth/CreateAccount'
import { SettingProfile } from './components/dashboard/sidebar/SettingProfile'
import { AddCollaborators } from './components/dashboard/sidebar/AddCollaborators'
import { Init } from './components/dashboard/sidebar/Init'
import { AddClient } from './components/dashboard/sidebar/AddClient'
import { AddOperations } from './components/dashboard/sidebar/AddOperations'
import { Monitoring } from './components/dashboard/sidebar/Monitoring'
import { AnalyticalReports } from './components/dashboard/sidebar/AnalyticalReports'
import { QuerysPresented } from './components/dashboard/sidebar/QuerysPresented'
import { GeneratedQuerysPendients } from './components/dashboard/sidebar/GeneratedQuerysPendients'

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />}>
            <Route index element={<Login />} />
            <Route path='/registrar' element={<CreateAccount />} />
            <Route
              path='/confirmar-cuenta/:token'
              element={<ConfirmAccount />}
            />
            <Route path='/olvide-password' element={<ForgotPassword />} />
            <Route
              path='/olvide-password/:token'
              element={<ChangePassword />}
            />
          </Route>
          <Route path='/dashboard' element={<RouteProtected />}>
            <Route index element={<Init />} />
            <Route path='configurar-perfil' element={<SettingProfile />} />
            <Route path='agregar-colaborador' element={<AddCollaborators />} />
            <Route path='agregar-clientes' element={<AddClient />} />
            <Route path='agregar-operacion' element={<AddOperations />} />
            <Route path='seguimiento-cumplimiento' element={<Monitoring />} />
            <Route path='reportes-analiticos' element={<AnalyticalReports />} />
            <Route
              path='consultas-avisos-presentados'
              element={<QuerysPresented />}
            />
            <Route
              path='avisos-pendientes'
              element={<GeneratedQuerysPendients />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App