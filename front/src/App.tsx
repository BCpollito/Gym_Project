import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import LibraryLayout from "./layouts/LibraryLayout";
import './services/axios.config';
import Clientes from "./Components/clientes";
import LibreriaExercises from "./Components/libreriaExercises";
import LibraryWorkout from "./Components/libraryWorkout";
import LibraryActivityLayout from "./layouts/LibraryActivityLayout";

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="clientes" element={<Clientes />} />    
          <Route path="/admin/libreria" element={<LibraryLayout />}>
          <Route path="/admin/libreria/activity" element={<LibraryActivityLayout />}>
            <Route path="exercises" element={<LibreriaExercises />} />
            <Route path="workouts" element={<LibraryWorkout />} />

          </Route>
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
