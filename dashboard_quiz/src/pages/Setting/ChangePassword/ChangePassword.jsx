import React from "react";
import { useForm } from "react-hook-form";
import Field from "../../../components/Field";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../services/user/user";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm();

  const settingChangeMutation = useMutation({
    mutationFn: changePassword,
  });

  const submitForm = async (data) => {
    const { oldPassword, newPassword, rePassword } = data;

    console.log(newPassword, rePassword);

    if (rePassword != newPassword) {
      toast.warning("Password doesn't match");

      return;
    }

    settingChangeMutation.mutate(
      {
        payload: { oldPassword, newPassword },
      },
      {
        onSuccess: (data) => {
          toast.success("Password change successfully");
          reset();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
        className="createQuestion  w-[400px]"
      >
        <Field error={errors.oldPassword} label={"Old Password"}>
          <input
            {...register("oldPassword", {
              required: "Old password is Required ",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter  old password"
            className="bg-slate-200 auth-input  "
          />
        </Field>

        <Field error={errors.newPassword} label={"New Password"}>
          <input
            {...register("newPassword", {
              required: "New Passwordis Required ",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter  new password"
            className="bg-slate-200 auth-input  "
          />
        </Field>

        <Field error={errors.rePassword} label={"Re-write New Password"}>
          <input
            {...register("rePassword", {
              required: "Re-write New Password is Required ",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="Enter re-write new password"
            className="bg-slate-200 auth-input  "
          />
        </Field>
        <div className="mt-6">
          <Field>
            <button className="bg-[#013564] text-white px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
              Change Password
            </button>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
