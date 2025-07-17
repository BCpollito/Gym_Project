import { Outlet } from "react-router-dom";
import LibraryNavigation from "../navigation/libraryNavigation";

export default function LibraryLayout() {
  return (
    <>
      <LibraryNavigation />
      <Outlet />
    </>
  );
}
