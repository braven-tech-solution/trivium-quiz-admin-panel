import React, { useEffect, useRef, useState } from "react";
import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFood } from "../../../services/food/food";

const CreateFoodModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { auth } = useAuth();

  const fileUploaderRef = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const createNewFoodMutation = useMutation({
    mutationFn: createNewFood,
  });

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    fileUploaderRef.current.files;

    const file = fileUploaderRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitForm = async (data) => {
    if (!auth?.email) {
      toast.warning("Please Login First");
      return;
    }

    if (!selectedFile) {
      setError("root.random", {
        type: "random",
        message: `Image is Required`,
      });
      return;
    }

    console.log({ data });

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("foodImage", selectedFile);

    foodCreateApiCall(formData);
  };

  const foodCreateApiCall = (formData) => {
    createNewFoodMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allFood"]);
          toast.success("Food Create successfully");
          navigate("/manage-all-food");
        },
        onError: (err) => {},
      }
    );
  };

  return (
    <main className="">
      <section>
        <div className="container">
          <div
            onClick={handleImageUpload}
            className="createBlog bg-slate-700/20 hover:bg-slate-700/50 mb-2 pt-2 hover:opacity-70"
          >
            {previewImage ? (
              <div className="relative cursor-pointer">
                <img
                  className="mx-auto  h-64"
                  src={previewImage}
                  alt="blog thumbnail"
                />
                <button
                  title="Update"
                  className="grid place-items-center absolute bottom-0 right-0 h-16 w-16 rounded-full   "
                >
                  <img src={editSvg} alt="Edit" className="w-10" />
                </button>{" "}
              </div>
            ) : (
              <div className="grid place-items-center cursor-pointer  h-64 rounded-md  ">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <img src={previewSvg} alt="Edit" className="w-10" />

                  <p className="">Upload Menu Image</p>
                </div>
              </div>
            )}
            <p className="text-red-600 pb-2">{errors?.root?.random?.message}</p>
          </div>
          <input id="file" type="file" ref={fileUploaderRef} hidden />

          <form
            onSubmit={handleSubmit(submitForm)}
            autoComplete="off"
            className="createBlog  "
          >
            <Field
              error={errors.priority}
              label={"Menu Item Priority ( 1 - 500 )"}
            >
              <input
                {...register("priority", {
                  required: "Priority is Required",
                  min: { value: 1, message: "Minimum value is 1" },
                  max: { value: 500, message: "Maximum value is 500" },
                })}
                type="number"
                name="priority"
                id="priority"
                placeholder="Enter menu item priority"
                className="auth-input text-white"
                defaultValue="1"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field error={errors?.foodType} label={"Select Food Type"}>
                <select
                  {...register("foodType", {
                    required: "Food Type is Required",
                  })}
                  name="foodType"
                  id="foodType"
                  className="auth-input text-white py-3"
                >
                  <option value="cakes" className="py-2">
                    Cake
                  </option>
                  <option value="savoury">Savouries</option>
                  <option value="bread">Bread</option>
                  <option value="sweetTreat">Sweet Treat</option>
                  <option value="offer">Offer</option>
                </select>
              </Field>

              <Field error={errors?.isNew} label={"Is New?"}>
                <div className="flex gap-4 auth-input  ">
                  <label>
                    <span className="text-green-600 auth-label">Yes:</span>

                    <input
                      type="radio"
                      value="yes"
                      className="ml-2 "
                      {...register("isNew", {
                        required: "Please select an option",
                      })}
                    />
                  </label>
                  <label>
                    <span className="text-green-600 auth-label"> No:</span>

                    <input
                      type="radio"
                      value="no"
                      defaultChecked
                      className="ml-2"
                      {...register("isNew", {
                        required: "Please select an option",
                      })}
                    />
                  </label>
                </div>
              </Field>

              {errors.isNew && <span>{errors.isNew.message}</span>}
            </div>

            <Field>
              <button className="bg-green-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
                Create New Food
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateFoodModal;
