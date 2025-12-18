import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // ---------- CHANGE ROLE ----------
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ---------- COMMON ACTION ----------
  const handleOwnerClick = () => {
    setOpen(false);
    if (isOwner) navigate("/owner");
    else changeRole();
  };

  const handleAuthClick = () => {
    setOpen(false);
    user ? logout() : setShowLogin(true);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-auto" />
        </Link>

        {/* ---------- DESKTOP MENU ---------- */}
        <div className="hidden md:flex items-center gap-8">

          {/* LINKS */}
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-sm font-semibold transition
                ${
                  location.pathname === link.path
                    ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                    : "text-gray-200 hover:text-blue-400"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* SEARCH */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search product..."
              className="border border-gray-400 rounded-full px-4 py-1.5 text-sm w-48 focus:w-64 transition-all outline-none bg-transparent text-white"
            />
            <img
              src={assets.search_icon}
              alt=""
              className="absolute right-3 top-2.5 w-4 opacity-70"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOwnerClick}
              className="px-4 py-1.5 text-sm font-semibold border border-white rounded-full hover:bg-blue-600 transition text-white"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>

            <button
              onClick={handleAuthClick}
              className="px-4 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ---------- MOBILE DROPDOWN ---------- */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-5 py-4 space-y-3">

          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block text-base font-medium py-2
                ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* MOBILE ACTIONS */}
          <div className="pt-4 space-y-2">
            <button
              onClick={handleOwnerClick}
              className="w-full py-2 font-semibold border rounded-md"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>

            <button
              onClick={handleAuthClick}
              className="w-full py-2 font-semibold bg-blue-600 text-white rounded-md"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
