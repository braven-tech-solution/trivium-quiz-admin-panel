import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavGaurd from "../components/NavGaurd/NavGaurd";
import NavbarMainLayout from "../components/NavbarMainLayout/NavbarMainLayout";

const MainLayout = () => {
  return (
    <div className="bg-[#CCBFB0]  ">
      <Navbar></Navbar>

      {/* <ul className="bg-[#1A393E] absolute  flex flex-col min-h-[calc(100vh-64px)] overflow-hidden overflow-y-scroll p-3 w-60 min-w-fit text-white">
        <NavbarMainLayout />
         
        <NavbarMainLayout />
      </ul>

      <div className="left-60 absolute right-0 w-full  min-h-[calc(100vh-64px)] overflow-hidden overflow-y-scroll">
        <Outlet></Outlet>
      </div> */}

      {/* <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  pt-2">
          <Outlet></Outlet>
        </div>

        {openMenu && (
          <div className="drawer-side menu p-4 w-80 min-h-full bg-[#1A393E] text-white">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <NavbarMainLayout />
          </div>
        )}
      </div> */}

      <div className="drawer lg:drawer-open  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2 bg-[#CCBFB0]   ">
          <Outlet></Outlet>
        </div>

        {/* {openMenu && ( */}
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 min-h-full bg-[#1A393E]  pt-[64px] lg:pt-0">
            <NavbarMainLayout />
          </ul>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default MainLayout;
