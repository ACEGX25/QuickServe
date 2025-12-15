
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Login page */}
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

