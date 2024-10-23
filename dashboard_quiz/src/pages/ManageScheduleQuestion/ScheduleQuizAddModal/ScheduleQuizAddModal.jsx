import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useRef, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import { addLive } from "../../../services/liveQuiz/liveQuiz";

const ScheduleQuizAddModal = ({ setModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );

  const { auth } = useAuth();

  const fileUploaderRef = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const addLiveMutation = useMutation({
    mutationFn: addLive,
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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const submitForm = async (data) => {
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

    addLiveMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allLiveQuiz"]);
          toast.success(" Live Quiz Added successfully");
          setModal(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );

    console.log(data);
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

            <div className="grid grid-cols-2 gap-5">
              {/* Start Time */}
              <Field error={errors.name} label={"Start Time"}>
                <Controller
                  control={control}
                  name="startTime"
                  defaultValue={startDate}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={(date) => {
                        setStartDate(date);
                        onChange(date);
                        // If the endDate is less than startDate, reset the endDate
                        if (endDate && date >= endDate) {
                          setEndDate(null);
                        }
                      }}
                      className="auth-input"
                      showTimeSelect
                      timeIntervals={5}
                      filterTime={filterPassedTime}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  )}
                />
              </Field>

              {/* End Time */}
              <Field error={errors.name} label={"End Time"}>
                <Controller
                  control={control}
                  name="endTime"
                  defaultValue={endDate}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={(date) => {
                        setEndDate(date);
                        onChange(date);
                      }}
                      className="auth-input"
                      showTimeSelect
                      timeIntervals={5}
                      filterTime={(time) => {
                        // Only allow times after the selected start date and time
                        return startDate ? time > startDate : true;
                      }}
                      minDate={startDate} // Disable dates before the selected start date
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  )}
                />
              </Field>
            </div>

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
              label={"Per Negative Answer Mark ( 0 - 5 )"}
            >
              <input
                {...register("negativeAnswerMark", {
                  required: "Negative Answer Mark is Required",
                  min: { value: 0, message: "Minimum value is 0" },
                  max: { value: 5, message: "Maximum value is 5" },
                })}
                type="number"
                name="negativeAnswerMark"
                id="negativeAnswerMark"
                placeholder="Enter Negative Answer Mark priority"
                className="auth-input  "
                defaultValue="0"
              />
            </Field>

            <Field error={errors.requirePoint} label={"Required Point"}>
              <input
                {...register("requirePoint", {
                  required: "Negative Answer Mark is Required",
                })}
                type="number"
                name="requirePoint"
                id="requirePoint"
                placeholder="Enter Negative Answer Mark priority"
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
                Create New Schedule Quiz
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ScheduleQuizAddModal;
