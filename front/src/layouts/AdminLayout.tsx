import { Outlet } from "react-router-dom";
import Navegacion from "../Components/navegacion";

export default function AdminLayout() {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
}
