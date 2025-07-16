import { Outlet } from "react-router-dom";
import Navegacion from "../Components/mainNavegacion";

export default function AdminLayout() {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
}
