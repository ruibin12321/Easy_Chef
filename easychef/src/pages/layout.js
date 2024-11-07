import { Outlet, Link } from "react-router-dom";
import Footer from "../components/footer";
import Navigation from "../components/navigation";

const Layout = () => {
  return (
    <>
      <Navigation />

      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;
