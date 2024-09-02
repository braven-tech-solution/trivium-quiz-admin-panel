import React from "react";
import NavGaurd from "../NavGaurd/NavGaurd";
import { NavLink } from "react-router-dom";
import { MdFeedback } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";

const NavbarMainLayout = () => {
  return (
    <ul className="pt-2 pb-4 space-y-1 text-sm">
      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/add-quiz-category"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Manage Quiz Category</span>
        </NavLink>
      </NavGaurd>
      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/add-quiz-level"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Manage Quiz Level</span>
        </NavLink>
      </NavGaurd>

      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/manage-quiz-question"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Manage Quiz Question</span>
        </NavLink>
      </NavGaurd>

      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/add-schedule-quiz"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <BiAddToQueue className="text-2xl" />
          <span>Add Schedule Quiz</span>
        </NavLink>
      </NavGaurd>

      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/manage-schedule-question"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Manage Schedule Question</span>
        </NavLink>
      </NavGaurd>
      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/Setting"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <IoSettingsOutline className="text-2xl" />
          <span>Setting</span>
        </NavLink>
      </NavGaurd>
    </ul>
  );
};

export default NavbarMainLayout;
