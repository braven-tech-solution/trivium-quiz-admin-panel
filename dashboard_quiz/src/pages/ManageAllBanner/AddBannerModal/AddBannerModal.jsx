import React, { useRef, useState } from "react";
import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFood } from "../../../services/food/food";
import { createNewBanner } from "../../../services/banner/banner";

const AddBannerModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [imgaa, setAAA] = useState("");

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

  const createNewBannerMutation = useMutation({
    mutationFn: createNewBanner,
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

    formData.append("bannerImage", selectedFile);

    foodCreateApiCall(formData);
  };

  const foodCreateApiCall = (formData) => {
    createNewBannerMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allBanner"]);
          toast.success("Banner Create successfully");
          navigate("/manage-all-banner");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <main className="">
      <section>
        <div className="container">
          <div
            onClick={handleImageUpload}
            className="createBlog bg-slate-700/20 hover:bg-slate-700/50  pt-2  mb-2 hover:opacity-70"
          >
            {previewImage ? (
              <div className="relative cursor-pointer">
                <img
                  className="mx-auto    h-[350px]  "
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
              <div className="grid place-items-center cursor-pointer     h-[350px] rounded-md  ">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <img src={previewSvg} alt="Edit" className="w-10" />

                  <p>Upload Banner Image</p>
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
              label={"Banner Image Priority ( 1 - 500 )"}
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

            <Field>
              <button className="bg-green-600 text-white mt-2 px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
                Create New Banner
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddBannerModal;
