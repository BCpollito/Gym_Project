import { Outlet } from "react-router-dom";
import LibraryNavigation from "../Components/libraryNavigation";

export default function LibraryLayout() {
  return (
    <>
      <LibraryNavigation />
      <Outlet />
    </>
  );
}
