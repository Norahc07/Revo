import { useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function LayoutShell({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/auth";

  return (
    <div className={`revo-app${hideNav ? " revo-app--landing" : ""}`}>
      <main className="revo-main">{children}</main>
      {!hideNav && <NavBar />}
    </div>
  );
}


