import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation } from "@tanstack/react-query";
import { registerFn } from "../../../services/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: registerFn,
  });

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      registerMutation.mutate(formData, {
        onSuccess: (data) => {
          toast.success("Registration successfully");

          navigate("/login");
        },
        onError: () => {
          toast.error("your email / password is invalid");
          setError("root.random", {
            type: "random",
            message: `your email / password is invalid`,
          });
        },
      });
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `your email / password is invalid`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
      <Field label="Full Name" error={errors?.userName}>
        <input
          {...register("userName", {
            required: "Full Name is Required",
          })}
          className={`auth-input ${
            !!errors?.userName ? "border-red-500" : "border-white/20"
          }`}
          type="text"
          name="userName"
          id="userName"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            !!errors.email ? "border-red-500" : "border-white/20"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-white/20"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>

      <p className="text-red-600 pb-4">{errors?.root?.random?.message}</p>

      <Field>
        <button className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
          Create Account
        </button>
      </Field>
    </form>
  );
};

export default RegisterForm;
