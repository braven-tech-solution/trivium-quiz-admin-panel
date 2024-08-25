import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <main className="min-h-[calc(100vh-250px)]">
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <RegisterForm />

          <p className="text-center">
            Already have account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
