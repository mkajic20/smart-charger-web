import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import { Register } from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Footer } from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import ProtectedRouteLogin from "./components/ProtectedRoutes/ProtectedRouteLogin";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>
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
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
