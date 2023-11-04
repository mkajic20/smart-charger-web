import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import { Register } from "./pages/Register/Register";
import { Footer } from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
