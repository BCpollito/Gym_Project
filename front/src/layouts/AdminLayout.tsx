import { Outlet } from "react-router-dom";
import Navegacion from "../navigation/mainNavegacion";

export default function AdminLayout() {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
}
