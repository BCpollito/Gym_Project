import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Adminpage from './adminpage';
import Userpage from './userpage';

function app(){
  return(
    <Router>  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Login.jsx" element={<Login />}/>
        <Route path="/Register.jsx" element={<Register />}/>
        <Route path="/adminpage.jsx" element={<Adminpage />}/>
        <Route path="/userpage.jsx" element={<Userpage />}/>
      </Routes>
    </Router>
  )
}

export default app;