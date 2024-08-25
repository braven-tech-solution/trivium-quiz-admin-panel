/* eslint-disable react/prop-types */
import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

const QuestionAddModal = ({ filterOption }) => {
  const [option, setOption] = useState("");
  const [questionOptions, setQuestionOptions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const submitForm = async (data) => {
    console.log(data);
  };

  // {
  //   title: "What is Flutter?",
  //   option: ["abs", "ccdd", "asd ge"],
  //   correct: "ccdd",
  //   status: "active",
  // },

  const handleOptionChangees = (e) => {
    const optionValue = e.target.value; // Get the name and value from the event
    setOption(optionValue);
  };

  const handleAddOption = () => {
    setQuestionOptions((prev) => [...prev, option]);
    setOption("");
  };

  const handleDeleteOption = (value) => {
    const remainValue = questionOptions.filter((item, index) => index != value);

    setQuestionOptions([...remainValue]);
  };

  console.log(questionOptions);

  return (
    <main className=" pt-4">
      <section>
        <div className="container">
          <form
            onSubmit={handleSubmit(submitForm)}
            autoComplete="off"
            className="createBlog  "
          >
            <Field error={errors?.foodType} label={"Select Category Type"}>
              <select
                {...register("categoryType", {
                  required: "Category Type is Required",
                })}
                name="categoryType"
                id="categoryType"
                className="auth-input py-3"
              >
                {filterOption?.map((option) => (
                  <option key={option} value={option} className="py-2">
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field error={errors.title} label={"Question Title"}>
              <input
                {...register("title", {
                  required: "Question Title is Required",
                })}
                type="text"
                name="title"
                id="title"
                placeholder="Enter Question Title"
                className="auth-input  "
              />
            </Field>

            <Field error={errors?.status} label={"Question Option Add"}>
              <div>
                <div className="flex gap-2 items-center border-2  p-2 mb-3">
                  <input
                    value={option}
                    onChange={handleOptionChangees}
                    className={`auth-input  `}
                    type="text"
                    name="option"
                    id="option"
                  />

                  <button
                    type="button"
                    className="w-32 bg-green-400 p-2 font-medium"
                    onClick={handleAddOption}
                  >
                    Add Option
                  </button>
                </div>
                {questionOptions?.map((option, index) => (
                  <div
                    key={option}
                    className="flex justify-start items-center gap-2 "
                  >
                    <div
                      onClick={() => handleDeleteOption(index)}
                      className="  flex justify-center  cursor-pointer "
                    >
                      <MdDelete className="text-xl text-red-600 cursor-pointer" />
                    </div>
                    <p>
                      {index + 1}. {option}
                    </p>
                  </div>
                ))}
              </div>
            </Field>

            <Field error={errors.title} label={"Correct Answer"}>
              <input
                {...register("correct", {
                  required: "Correct Answer is Required",
                })}
                type="text"
                name="correct"
                id="correct"
                placeholder="Enter Correct Answer"
                className="auth-input  "
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

export default QuestionAddModal;
