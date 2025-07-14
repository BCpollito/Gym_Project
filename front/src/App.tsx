import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Navegacion from './Components/navegacion';
import './services/axios.config';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Navegacion />
    </Router>
  );
}

export default App;
