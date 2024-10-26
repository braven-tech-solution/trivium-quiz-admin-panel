/* eslint-disable no-extra-boolean-cast */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../../../components/Field";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      loginMutation.mutate(formData, {
        onSuccess: (data) => {
          // const { data } = data;
          console.log({ data });
          toast.success("Login successfully");
          setAuth({ ...data });

          navigate("/");
        },
        onError: (error) => {
          const errorResponse =
            JSON.parse(error?.message) || "An error occurred";

          console.log({ errorResponse });

          toast.error(errorResponse?.errorMessage);
          setError("root.random", {
            type: "random",
            message: "Email / Password not match",
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
        <button className="w-full bg-[#1c545e] text-white p-2 text-2xl rounded-md hover:bg-[#135f6b] transition-all duration-200">
          LOGIN
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
