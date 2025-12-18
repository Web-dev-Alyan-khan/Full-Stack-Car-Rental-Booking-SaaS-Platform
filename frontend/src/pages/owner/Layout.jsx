/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NavberOwner from "../../components/owner/NavberOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {

  const {isOwner, navigate} = useAppContext()

  useEffect(() =>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className="w-full h-screen flex flex-col">

      {/* Top Navbar */}
      <NavberOwner />

      {/* Main Area = Sidebar + Page Content */}
      <div className="flex w-full h-full">

        {/* Sidebar Left */}
        <div>
          <Sidebar />
        </div>

        {/* Page Content Right */}
        <div>
          <Outlet /> {/* This loads the pages inside Layout */}
        </div>

      </div>
    </div>
  );
};

export default Layout;
