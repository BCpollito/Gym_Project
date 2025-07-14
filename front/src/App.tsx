import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Adminpage from './Components/adminpage';
import Userpage from './Components/userpage';
import AddRoutine from './Components/addroutine';
import './services/axios.config';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/userpage/:usuarioid" element={<Userpage />} />
        <Route path="/addrutine/:clientId" element={<AddRoutine />} />
      </Routes>
    </Router>
  );
}

export default App;
