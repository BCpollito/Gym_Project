import { Outlet } from "react-router-dom";
import LibraryActivityNavigation from "../navigation/LibraryActivityNavigation";

export default function LibraryActivityLayout() {
  return (
    <>
      <LibraryActivityNavigation />
      <Outlet />
    </>
  );
}