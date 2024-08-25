import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" mx-auto text-white  text-6xl font-semibold  rounded-md px-3 pb-2">
        404
      </h1>
      <h1 className=" mx-auto text-white mt-5 text-xl font-semibold  rounded-md px-3 py-2">
        Page Not Found.
      </h1>
      <Link
        to={"/"}
        className="  mx-auto text-white mt-5 text-xl font-semibold bg-[#0089D0] rounded-md px-3 py-2"
      >
        Go to Home Page{" "}
      </Link>
    </div>
  );
};

export default NotFound;
