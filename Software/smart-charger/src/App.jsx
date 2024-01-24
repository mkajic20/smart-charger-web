import React from 'react'
import { Route, Routes } from 'react-router'
import Header from './components/Header/Header'
import { Register } from './pages/Register/Register'
import { Login } from './pages/Login/Login'
import { Footer } from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'
import ProtectedRouteLogin from './components/ProtectedRoutes/ProtectedRouteLogin'
import ProtectedRouteAdmin from './components/ProtectedRoutes/ProtectedRouteAdmin'
import ProtectedRouteUser from './components/ProtectedRoutes/ProtectedRouteUser'
import { UserManagement } from './pages/UserManagement/UserManagement'
import { CardManagementAdmin } from './pages/CardManagementAdmin/CardManagementAdmin'
import { ChargerManagement } from './pages/ChargerManagement/ChargerManagement'
import { CardManagementUser } from './pages/CardManagementUser/CardManagementUser'
import { Map } from './pages/Map/Map'
import { ChargingHistoryUser } from './pages/ChargingHistoryUser/ChargingHistoryUser'
import { ChargingHistoryAdmin } from './pages/ChargingHistoryAdmin/ChargingHistoryAdmin'
import { Statistics } from './pages/Statistics/Statistics'
import { Main, PageContainer } from './utils/styles/generalStyles'

function App() {
  return (
    <>
      <AuthProvider>
        <PageContainer>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<ProtectedRoute></ProtectedRoute>} />

              <Route
                path="/register"
                element={
                  <ProtectedRouteLogin>
                    <Register />
                  </ProtectedRouteLogin>
                }
              />

              <Route
                path="/login"
                element={
                  <ProtectedRouteLogin>
                    <Login />
                  </ProtectedRouteLogin>
                }
              />

              <Route
                path="/user-management"
                element={
                  <ProtectedRouteAdmin>
                    <UserManagement />
                  </ProtectedRouteAdmin>
                }
              />

              <Route
                path="/card-management"
                element={
                  <ProtectedRouteAdmin>
                    <CardManagementAdmin />
                  </ProtectedRouteAdmin>
                }
              />

              <Route
                path="/charger-management"
                element={
                  <ProtectedRouteAdmin>
                    <ChargerManagement />
                  </ProtectedRouteAdmin>
                }
              />

              <Route
                path="/card-management-user"
                element={
                  <ProtectedRouteUser>
                    <CardManagementUser />
                  </ProtectedRouteUser>
                }
              />

              <Route
                path="/charging-history"
                element={
                  <ProtectedRouteUser>
                    <ChargingHistoryUser />
                  </ProtectedRouteUser>
                }
              />

              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <Map />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/charging-history-admin"
                element={
                  <ProtectedRouteAdmin>
                    <ChargingHistoryAdmin />
                  </ProtectedRouteAdmin>
                }
              />

              <Route
                path="/statistics/:id"
                element={
                  <ProtectedRouteAdmin>
                    <Statistics />
                  </ProtectedRouteAdmin>
                }
              />
            </Routes>
          </Main>

          <Footer />
        </PageContainer>
      </AuthProvider>
    </>
  )
}

export default App
