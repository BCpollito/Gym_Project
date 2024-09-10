import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './login';
import Register from './register';

function app(){
  return(
    <Router>  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register.jsx" element={<Register />}/>
      </Routes>
    </Router>
  )
}

export default app;