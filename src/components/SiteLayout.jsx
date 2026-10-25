import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./header/NavBar";
import TopBar from "./header/TopBar";

function SiteLayout() {
  return (
    <>
      <TopBar />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default SiteLayout;
