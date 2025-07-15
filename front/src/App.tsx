import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import './services/axios.config';
import Clientes from "./Components/clientes";
import Libreria from "./Components/libreria";

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AdminLayout />}>
          <Route path="/clientes" element={<Clientes />} />
          <Route index element={<Clientes />} />
          <Route path="clientes" element={<Clientes />} />          
          <Route path="libreria" element={<Libreria />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
