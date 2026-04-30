import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { Menu, X, Search, ShieldCheck, Power, LayoutDashboard, CarFront } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success("Privilege Elevated: Owner Access Granted");
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Telemetry Error: Authentication Failed");
    }
  };

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
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-3 bg-black/60 backdrop-blur-xl border-b border-white/5" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link to="/" className="relative group">
          <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <img src={assets.logo} alt="Elite Logo" className="relative h-9 md:h-11 w-auto transition-transform active:scale-95" />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-10">
          
          {/* NAVIGATION LINKS */}
          <div className="flex items-center gap-8">
            {menuLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`relative text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MINIMALIST SEARCH */}
          <div className="relative group hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="LOCATE FLEET..."
              className="bg-white/5 border border-white/10 rounded-full px-11 py-2 text-[10px] font-bold tracking-widest w-40 focus:w-60 focus:bg-white/10 focus:border-cyan-500/50 transition-all outline-none text-white placeholder-gray-600"
            />
          </div>

          {/* ACTION SYSTEM */}
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <button
              onClick={handleOwnerClick}
              className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full border transition-all ${
                isOwner 
                ? "bg-cyan-500 text-black border-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
                : "text-white border-white/20 hover:bg-white/5"
              }`}
            >
              {isOwner ? <LayoutDashboard size={14} /> : <CarFront size={14} />}
              {isOwner ? "Dashboard" : "List My Fleet"}
            </button>

            <button
              onClick={handleAuthClick}
              className="group flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white text-black rounded-full hover:bg-cyan-400 transition-all active:scale-95"
            >
              <Power size={14} className={user ? "text-red-600" : "text-cyan-600"} />
              {user ? "Terminate" : "Auth"}
            </button>
          </div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-xl transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE HUD DROPDOWN --- */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-2xl border-b border-white/10 p-8 space-y-6 animate-in slide-in-from-top-5 duration-300">
          <div className="space-y-4">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block text-xs font-black uppercase tracking-[0.3em] ${
                  location.pathname === link.path ? "text-cyan-400" : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 space-y-3">
            <button
              onClick={handleOwnerClick}
              className="w-full py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-2xl text-white"
            >
              <LayoutDashboard size={16} className="text-cyan-400" />
              {isOwner ? "Access Console" : "Register Fleet"}
            </button>

            <button
              onClick={handleAuthClick}
              className={`w-full py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest rounded-2xl ${
                user ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-cyan-500 text-black"
              }`}
            >
              <Power size={16} />
              {user ? "Logoff System" : "Driver Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;