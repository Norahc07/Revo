import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/home", icon: "fa-home", label: "Home" },
  { to: "/progress", icon: "fa-chart-line", label: "Progress" },
  { to: "/notes", icon: "fa-note-sticky", label: "Notes" },
  { to: "/settings", icon: "fa-gear", label: "Settings" },
  { to: "/UP", icon: "fa-user", label: "Profile" }
];

export default function NavBar() {
  return (
    <nav className="revo-nav">
      <div className="revo-nav-logo">
        <img src="/ReVo_logo-removebg-preview.png" alt="ReVo" />
      </div>
      <div className="revo-nav-main">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "revo-nav-item" + (isActive ? " revo-nav-item--active" : "")
            }
          >
            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

