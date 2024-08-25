import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import Field from "../../components/Field";
import { updatePassword } from "../../services/auth";

const ManagePassword = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
  });

  const submitForm = async ({ password, re_password }) => {
    if (password != re_password) {
      toast.warning("Password not matching");
      return;
    }

    try {
      updatePasswordMutation.mutate(
        { password },
        {
          onSuccess: () => {
            toast.success("Password change sucessfully");
          },
          onError: (error) => {
            toast.error("Password change Error");
          },
        }
      );
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `your email / password is invalid`,
      });
    }
  };

  //   $2b$11$JK.j8H1vFRgmO40Ifi6aDeL2f44U7QdjNCxBuB.IK59F/HRWrt/u2

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      autoComplete="off"
      className="p-10"
    >
      <Field label="New Password" error={errors.password}>
        <input
          {...register("password", { required: "password ID is Required" })}
          className={`auth-input ${
            !!errors.email ? "border-red-500" : "border-white/20"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>

      <Field label="Re-new Password" error={errors.re_password}>
        <input
          {...register("re_password", {
            required: "Re  password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-white/20"
          }`}
          type="password"
          name="re_password"
          id="re_password"
        />
      </Field>

      <p className="text-red-600 pb-4">{errors?.root?.random?.message}</p>

      <Field>
        <button className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
          Update Password
        </button>
      </Field>
    </form>
  );
};

export default ManagePassword;
