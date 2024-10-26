import React, { useState } from "react";
import NavGaurd from "../NavGaurd/NavGaurd";
import { NavLink, useLocation } from "react-router-dom";
import { MdFeedback } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoDocumentLockSharp } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";

import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    key: "sub4",
    label: "Setting",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
];

const NavbarMainLayout = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const path = useLocation();

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  return (
    <ul className="pt-2 pb-4 space-y-1 text-sm">
      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Dashboard</span>
        </NavLink>
      </NavGaurd>
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
          to="/manage-live-quiz"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <BiAddToQueue className="text-2xl" />
          <span>Manage Live Quiz</span>
        </NavLink>
      </NavGaurd>

      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/manage-live-quiz-question"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <TiEdit className="text-2xl" />
          <span>Manage Live Quiz Question</span>
        </NavLink>
      </NavGaurd>
      <NavGaurd accesslist={["admin", "accounts"]}>
        <NavLink
          to="/users-history"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
              : " flex items-center p-2 space-x-3 rounded-md"
          }
        >
          <FaUsers className="text-2xl" />
          <span> Users History</span>
        </NavLink>
      </NavGaurd>
      <div className=" space-x-3 rounded-md">
        <div
          className="flex justify-between items-center  rounded-md p-2 hover:cursor-pointer my-1"
          onClick={() => handleDropdownClick(1)}
        >
          <div className="flex items-center ">
            <CiSettings className="text-2xl" />
            <h1 className="   ml-3  ">Setting</h1>
          </div>
          {/* <Icon icon="ep:arrow-down-bold" /> */}
          {activeDropdown === 1 ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
        {activeDropdown === 1 && (
          <div className="ml-6">
            {/* <NavLink
              to="/privacy-policy"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <FaUsers className="text-2xl" />
              <span> Create Admin</span>
            </NavLink> */}
            <NavLink
              to="/privacy-policy"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <MdOutlinePrivacyTip className="text-2xl" />
              <span> Privacy Policy</span>
            </NavLink>
            <NavLink
              to="/terms-and-condition"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <IoDocumentLockSharp className="text-2xl" />
              <span>Terms And Condition</span>
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <FcAbout className="text-2xl" />
              <span>About Us</span>
            </NavLink>
            <NavLink
              to="/change-password"
              className={({ isActive }) =>
                isActive
                  ? "text-green-400 flex items-center p-2 space-x-3 rounded-md"
                  : " flex items-center p-2 space-x-3 rounded-md"
              }
            >
              <MdOutlinePassword className="text-2xl" />
              <span>Change Password</span>
            </NavLink>
          </div>
        )}
      </div>
      {/*
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
      </NavGaurd> */}
    </ul>
  );
};

export default NavbarMainLayout;
