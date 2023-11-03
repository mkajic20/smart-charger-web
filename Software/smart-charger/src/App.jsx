import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import { Register } from "./pages/Register/Register";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
