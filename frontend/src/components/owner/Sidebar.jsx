import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();

  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  // ---------------- IMAGE UPDATE ----------------
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
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    }
  };

  return (
    <>
      {/* ---------------- MOBILE MENU BUTTON ---------------- */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-lg"
      >
        <img src={assets.menu_icon} alt="menu" className="w-6" />
      </button>

      {/* ---------------- DARK OVERLAY (MOBILE) ---------------- */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <div
        className={`fixed md:static top-0 left-0 z-40
        w-64 h-screen bg-white shadow-lg p-6
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* ---------------- CLOSE BUTTON (MOBILE) ---------------- */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        {/* ---------------- PROFILE SECTION ---------------- */}
        <div className="flex flex-col items-center gap-3 mt-6">

          <label htmlFor="image" className="relative cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.image ||
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
              }
              alt="User"
              className="w-28 h-28 object-cover rounded-full border"
            />

            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
              <img src={assets.edit_icon} alt="" className="w-4" />
            </div>

            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          {image && (
            <button
              onClick={updateImage}
              className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg"
            >
              Save
              <img src={assets.check_icon} width={13} alt="" />
            </button>
          )}

          <p className="text-lg font-semibold text-gray-800">
            {user?.name || "Loading..."}
          </p>
        </div>

        {/* ---------------- MENU LINKS ---------------- */}
        <div className="mt-8 flex flex-col gap-3">
          {ownerMenuLinks.map((link, index) => {
            const isActive = link.path === location.pathname;

            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt=""
                  className="w-5"
                />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
