import react from "react";
import { NavLink, useLocation } from "react-router-dom";

// SVGs
import AddPic from "../svg/AddPic";
import Settings from "../svg/Settings";
import Search from "../svg/Search";
import Group from "../svg/Group";
import Add from "../svg/Add";

function Navbar() {
  const { pathname } = useLocation();
  const links = [
    {
      icon: <Search />,
      label: "Browse Roomy Groups",
      path: "/",
    },
    {
      icon: <Group />,
      label: "My Groups",
      path: "/groups",
    },
    {
      icon: <Add />,
      label: "Create Roomy Group",
      path: "/create",
    },
    {
      icon: <Settings />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="sidebar">
      <main>
        {/* Logo */}
        <div className="row">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/roomy-logo.png"}
            alt="Roomy"
            className="sidebar__logo"
          />
          <h1 className="sidebar__title">Roomy</h1>
        </div>
        <hr />

        {/* Profile */}
        <div className="sidebar__profile-box center-vertical">
          <div className="sidebar__profile center">
            <AddPic />
          </div>
          {/* ---- CHANGE LATER ---- */}
          <p className="sidebar__username">User398409</p>
        </div>

        {/* Links */}
        <div className="sidebar__links">
          {links.map((link) => {
            const { icon, path, label } = link;
            const active = pathname === path;

            return (
              <NavLink
                to={path}
                className={`sidebar__link row ${
                  active ? "sidebar__link-active" : ""
                } `}
              >
                {icon}
                {label}
              </NavLink>
            );
          })}
        </div>
      </main>

      {/* Logout */}
      <button type="button" className="sidebar__logout">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
