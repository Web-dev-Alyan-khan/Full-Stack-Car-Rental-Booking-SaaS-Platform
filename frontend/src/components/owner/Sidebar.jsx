import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { X, Menu, Camera, Shield, LogOut } from "lucide-react";

const Sidebar = () => {
  const { user, axios, fetchUser, logout } = useAppContext();
  const location = useLocation();

  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", user._id);
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        fetchUser();
        toast.success("Profile Authenticated");
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Telemetry Sync Failed");
    }
  };

  return (
    <>
      {/* --- MOBILE TRIGGER --- */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 left-6 z-[60] bg-cyan-500 text-black p-3 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)]"
      >
        <Menu size={20} />
      </button>

      {/* --- ELITE OVERLAY --- */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50] md:hidden transition-opacity"
        ></div>
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div
        className={`fixed md:sticky top-0 left-0 z-[55]
        w-72 h-screen bg-[#050505] border-r border-white/5 flex flex-col
        transform transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Close Button Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 text-gray-500 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* --- BRAND SECTION --- */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-black" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl italic">
              OWNER<span className="text-cyan-500">HUB</span>
            </span>
          </div>
        </div>

        {/* --- PROFILE COMMANDER --- */}
        <div className="px-8 mb-10">
          <div className="relative group w-fit mx-auto">
            <label htmlFor="image" className="relative block cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"}
                alt="Commander"
                className="relative w-24 h-24 object-cover rounded-full border-2 border-white/10"
              />
              <div className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full text-black shadow-lg">
                <Camera size={12} />
              </div>
              <input type="file" id="image" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            
            {image && (
              <button
                onClick={updateImage}
                className="mt-4 w-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest py-2 rounded-lg animate-bounce"
              >
                Sync Profile
              </button>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-white font-bold tracking-tight">
              {user?.name || "Initializing..."}
            </p>
            <p className="text-[10px] text-cyan-500/60 font-black uppercase tracking-[0.2em] mt-1">
              Verified Partner
            </p>
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <nav className="flex-1 px-4 space-y-2">
          {ownerMenuLinks.map((link, index) => {
            const isActive = link.path === location.pathname;
            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all
                  ${isActive 
                    ? "bg-white/5 text-cyan-400 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"}`}
              >
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt=""
                  className={`w-5 ${isActive ? "brightness-125" : "opacity-40 grayscale"}`}
                />
                <span>{link.name}</span>
                {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* --- SYSTEM FOOTER --- */}
        <div className="p-6 border-t border-white/5">
           <button 
            onClick={logout}
            className="flex items-center gap-4 px-6 py-4 w-full text-gray-600 hover:text-red-500 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
           >
             <LogOut size={18} />
             <span>Terminate Session</span>
           </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;