import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Adminpage from './adminpage';
import Userpage from './userpage';
import AddRoutine from './addroutine';
import './axios.config'

function app(){
  return(
    <Router>  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/adminpage" element={<Adminpage />}/>
        <Route path="/userpage/:usuarioid" element={<Userpage />}/>
        <Route path="/addrutine/:clientId" element={<AddRoutine />} />
      </Routes>
    </Router>
  )
}

export default app;