/* eslint-disable react/prop-types */
import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useEffect, useRef, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";

const EditScheduleQuizModal = ({ scheduleQuiz }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );

  const { auth } = useAuth();

  const fileUploaderRef = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  console.log(scheduleQuiz);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError,
  } = useForm();

  useEffect(() => {
    if (scheduleQuiz?.id) {
      setValue("name", scheduleQuiz?.name);
      setValue(
        "status",
        scheduleQuiz?.status === "deactive" ? "deactive" : "active"
      );
      setPreviewImage(scheduleQuiz?.image);
    }
  }, [scheduleQuiz?.id]);

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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const submitForm = async (data) => {
    console.log(data);
  };

  return (
    <main className=" pt-4">
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

                  <p className="">Upload Schedule Quiz Image</p>
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
            <Field error={errors.name} label={"Schedule Quiz Name"}>
              <input
                {...register("name", {
                  required: "Schedule Quiz Name is Required",
                })}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Schedule Quiz Name"
                className="auth-input  "
              />
            </Field>
            <Field error={errors.name} label={"Schedule Quiz Time"}>
              <Controller
                control={control}
                name="startDate"
                defaultValue={startDate}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={(date) => {
                      setStartDate(date);
                      onChange(date);
                    }}
                    className="auth-input  "
                    showTimeSelect
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                )}
              />
            </Field>
            <Field
              error={errors.perCorrectAnswerMark}
              label={"Per Correct Answer Mark ( 1 - 5 )"}
            >
              <input
                {...register("perCorrectAnswerMark", {
                  required: "Per Correct Answer Mark is Required",
                  min: { value: 1, message: "Minimum value is 1" },
                  max: { value: 5, message: "Maximum value is 5" },
                })}
                type="number"
                name="perCorrectAnswerMark"
                id="perCorrectAnswerMark"
                placeholder="Enter Correct Answer Mark item priority"
                className="auth-input  "
                defaultValue="1"
              />
            </Field>
            <Field
              error={errors.negativeAnswerMark}
              label={"Per Negative Answer Mark ( 1 - 5 )"}
            >
              <input
                {...register("negativeAnswerMark", {
                  required: "Negative Answer Mark is Required",
                  min: { value: 1, message: "Minimum value is 1" },
                  max: { value: 5, message: "Maximum value is 5" },
                })}
                type="number"
                name="negativeAnswerMark"
                id="negativeAnswerMark"
                placeholder="Enter Negative Answer Mark priority"
                className="auth-input  "
                defaultValue="1"
              />
            </Field>
            <Field error={errors?.status} label={"Schedule Quiz Status"}>
              <select
                {...register("status", {
                  required: "Schedule Quiz Status is Required",
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
                Update Schedule Quiz
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditScheduleQuizModal;