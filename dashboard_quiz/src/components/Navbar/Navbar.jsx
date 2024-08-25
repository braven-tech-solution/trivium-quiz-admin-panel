import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const handleLogut = () => {
    logout();
    setAuth({});
    navigate("/login");
  };

  const menuItem = (
    <>
      {auth?._id ? (
        <>
          {/* <li className="  font-semibold">
            <Link to="/dashboard">Dashboard</Link>
          </li> */}

          <li className="text-red-500 font-semibold">
            <button onClick={handleLogut}>Logout</button>
          </li>
        </>
      ) : (
        <li className="font-semibold">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 navbar bg-[#1A393E] text-white shadow-lg flex justify-between">
      <div className="">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className=" text-[#FCAE50] font-bold text-2xl pl-10">
            Quiz
          </Link>

          {/* <label htmlFor="my-drawer-2" className="lg:hid">
            <FaBars />
          </label> */}
        </div>
      </div>

      <div className="dropdown ">
        <label tabIndex={0} className="  lg:hidden   ">
          <span className="px-3 py-[6px] text-2xl bg-slate-400 text-center rounded-full">
            {auth?.userName?.slice(0, 1)}
          </span>
          <input type="text" name="s" id="d" hidden />
        </label>
        <ul
          tabIndex={1}
          className="menu menu-compact dropdown-content right-0 mt-3 p-2 shadow bg-[#1A393E]/90 rounded-box w-52"
        >
          {menuItem}
        </ul>
      </div>

      <div className=" hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItem}</ul>
      </div>
    </div>
  );
};

export default Navbar;
