import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './register';
import Adminpage from './adminpage';
import Userpage from './userpage';

function app(){
  return(
    <Router>  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register.jsx" element={<Register />}/>
        <Route path="/adminpage.jsx" element={<Adminpage />}/>
        <Route path="/userpage" element={<Userpage />}/>
      </Routes>
    </Router>
  )
}

export default app;