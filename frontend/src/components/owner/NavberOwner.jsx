import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const NavberOwner = ({ setSidebarOpen }) => {
  const { user } = useAppContext();

  return (
    <div className="w-full bg-white shadow-sm px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT: Menu + Logo */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg bg-blue-600"
        >
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-9 md:h-10 object-contain" />
        </Link>
      </div>

      {/* RIGHT: USER NAME */}
      <p className="text-gray-700 font-medium text-sm md:text-lg">
        Welcome,{" "}
        <span className="font-semibold text-blue-600">
          {user?.name || "Owner"}
        </span>
      </p>
    </div>
  );
};

export default NavberOwner;
