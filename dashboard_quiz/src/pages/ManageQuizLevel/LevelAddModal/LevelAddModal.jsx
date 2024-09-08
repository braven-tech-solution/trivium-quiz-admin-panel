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
import { addLevel } from "../../../services/level/level";

const LevelAddModal = ({ setModal, allCategoryData }) => {
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

  const addLevelMutation = useMutation({
    mutationFn: addLevel,
  });

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();

    setError("root.random", {});
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

    addLevelMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allLevel"]);
          toast.success("Level Create successfully");
          setModal(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <main className="  pt-4   ">
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
                </button>
              </div>
            ) : (
              <div className="grid place-items-center cursor-pointer  h-40 rounded-md  ">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <img src={previewSvg} alt="Edit" className="w-10" />

                  <p className="">Upload Level Image</p>
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
            <Field error={errors?.category} label={"Select Category Type"}>
              <select
                {...register("category", {
                  required: "Category Type is Required",
                })}
                name="category"
                id="category"
                className="auth-input py-3"
              >
                {allCategoryData?.map((option) => (
                  <option key={option} value={option.id} className="py-2">
                    {option.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field error={errors.name} label={"Level Name"}>
              <input
                {...register("name", {
                  required: "Level Name is Required",
                })}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Level Name"
                className="auth-input  "
              />
            </Field>
            <Field error={errors.priority} label={"Quiz duration ( Minute ) "}>
              <input
                {...register("duration", {
                  required: "Duration is Required ",
                  min: { value: 10, message: "Minimum value is 10" },
                  max: { value: 200, message: "Maximum value is 200" },
                })}
                type="number"
                name="duration"
                id="duration"
                placeholder="Enter quiz duration"
                className="auth-input  "
                defaultValue={10}
              />
            </Field>
            <Field error={errors.name} label={"Per Question Mark"}>
              <input
                {...register("perQuestionMark", {
                  required: "Per Question Mark is Required",
                })}
                type="number"
                name="perQuestionMark"
                id="perQuestionMark"
                placeholder="Enter Per Question Mark"
                className="auth-input  "
              />
            </Field>
            <Field
              error={errors.negativeAnswerMark}
              label={"Nagative Answer Mark"}
            >
              <input
                {...register("negativeAnswerMark", {
                  required: "Nagative Answer Mark is Required",
                })}
                type="text"
                name="negativeAnswerMark"
                id="negativeAnswerMark"
                placeholder="Enter Nagative Answer Mark"
                className="auth-input  "
              />
            </Field>
            <Field error={errors.priority} label={"Level Priority"}>
              <input
                {...register("priority", {
                  required: "Priority is Required ",
                  // min: { value: 1, message: "Minimum value is 1" },
                  // max: { value: 500, message: "Maximum value is 500" },
                })}
                type="number"
                name="priority"
                id="priority"
                placeholder="Enter category priority"
                className="auth-input  "
                defaultValue="1"
              />
            </Field>
            <Field error={errors?.status} label={"Level Status"}>
              <select
                {...register("status", {
                  required: "Level Status is Required",
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
                Create New Level
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LevelAddModal;
