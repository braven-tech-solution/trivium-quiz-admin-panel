import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className=" flex justify-center items-center min-h-screen  bg-[#f8f5ed]">
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto p-8 rounded-md mt-12 bg-slate-300">
          {/* <h2 className="text-2xl font-bold mb-6">Login</h2> */}

          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default Login;
