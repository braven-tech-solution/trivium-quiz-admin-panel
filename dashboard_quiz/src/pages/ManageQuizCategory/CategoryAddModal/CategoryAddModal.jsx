import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCategory } from "../../../services/category/category";

const CategoryAddModal = ({ setModal }) => {
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

  const categoryCreateMutation = useMutation({
    mutationFn: createNewCategory,
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
    data.priority = Number(data.priority);
    console.log(data);

    if (!selectedFile) {
      setError("root.random", {
        type: "random",
        message: `Image is Required`,
      });
      return;
    }

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("image", selectedFile);

    categoryCreateMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allCategory"]);
          toast.success("Category Create successfully");
          // console.log("Category Create successfully");
          setModal(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <main className="  pt-4 ">
      <section>
        <div className="container">
          <div
            onClick={handleImageUpload}
            className="createBlog bg-slate-700/20 hover:bg-slate-700/50 mb-2 pt-2 hover:opacity-70"
          >
            {previewImage ? (
              <div className="relative cursor-pointer">
                <img
                  className="mx-auto  h-40"
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
              <div className="grid place-items-center cursor-pointer  h-40 rounded-md  ">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <img src={previewSvg} alt="Edit" className="w-10" />

                  <p className="">Upload Category Image</p>
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
            <Field error={errors.name} label={"Category Name"}>
              <input
                {...register("name", {
                  required: "Category Name is Required",
                })}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Category Name"
                className="auth-input  "
              />
            </Field>

            <Field
              error={errors.priority}
              label={"Category Priority ( 1 - 500 )"}
            >
              <input
                {...register("priority", {
                  required: "Priority is Required ",
                  min: { value: 1, message: "Minimum value is 1" },
                  max: { value: 500, message: "Maximum value is 500" },
                })}
                type="number"
                name="priority"
                id="priority"
                placeholder="Enter category priority"
                className="auth-input  "
                defaultValue="1"
              />
            </Field>
            <Field error={errors?.status} label={"Category Status"}>
              <select
                {...register("status", {
                  required: "Category Status is Required",
                })}
                name="status"
                id="status"
                className="auth-input   py-3"
              >
                <option value="active" className="py-2">
                  Active
                </option>
                <option value="deactive">Deactive</option>
              </select>
            </Field>
            <Field>
              <button className="bg-green-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
                Create New Category
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CategoryAddModal;
