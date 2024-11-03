/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import Field from "../../../components/Field";

const EditQuestionModal = ({
  question,
  allLiveQuiz,
  setModal,
  questionUpdate,
}) => {
  const [option, setOption] = useState("");
  const [options, setOptions] = useState({
    option1: question?.option1,
    option2: question?.option2,
    option3: question?.option3,
    option4: question?.option4,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    if (question?._id) {
      // console.log("  question.categoryType", question.categoryType);
      setValue("categoryType", question.categoryType);
      setValue("title", question?.title);
      setValue("option1", question?.option1);
      setValue("option2", question?.option2);
      setValue("option3", question?.option3);
      setValue("option4", question?.option4);
      setValue("correctAnswer", question?.correctAnswer); // Set initial value for correctAnswer
      setValue(
        "status",
        question?.status === "deactive" ? "deactive" : "active"
      );

      const cTyepe = allLiveQuiz?.find(
        (option) => option._id === question.model_id
      );

      setValue("categoryType", cTyepe.name);

      // console.log({ cTyepe });
    }
  }, [question?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const submitForm = async (data) => {
    console.log(data);

    await questionUpdate(question?._id, data);

    setModal(false);
  };

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
                {allLiveQuiz?.map((option) => (
                  <option key={option.id} value={option.id} className="py-2">
                    {option.name}
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

            <Field error={errors.option1} label={"Option 1"}>
              <input
                {...register("option1", {
                  required: "Option 1 is Required",
                })}
                type="text"
                name="option1"
                id="option1"
                placeholder="Enter Option 1"
                className="bg-slate-200  auth-input  "
                value={options.option1}
                onChange={handleInputChange}
              />
            </Field>
            <Field error={errors.option2} label={"Option 2"}>
              <input
                {...register("option2", {
                  required: "Option 2 is Required",
                })}
                type="text"
                name="option2"
                id="option2"
                placeholder="Enter Option 2"
                className="bg-slate-200 auth-input  "
                value={options.option2}
                onChange={handleInputChange}
              />
            </Field>
            <Field error={errors.option3} label={"Option 3"}>
              <input
                {...register("option3", {
                  required: "Option 3 is Required",
                })}
                type="text"
                name="option3"
                id="option3"
                placeholder="Enter Option 1"
                className="bg-slate-200 auth-input  "
                value={options.option3}
                onChange={handleInputChange}
              />
            </Field>
            <Field error={errors.option4} label={"Option 4"}>
              <input
                {...register("option4", {
                  required: "Option 1 is Required",
                })}
                type="text"
                name="option4"
                id="option4"
                placeholder="Enter Option 4"
                className="bg-slate-200 auth-input  "
                value={options.option4}
                onChange={handleInputChange}
              />
            </Field>

            <Field error={errors.correctAnswer} label={"Correct Answer"}>
              <select
                {...register("correctAnswer", {
                  required: "Correct Answer is Required",
                })}
                name="correctAnswer"
                id="correctAnswer"
                className="bg-slate-200 auth-input py-3"
              >
                <option value={options.option1}>{options.option1}</option>
                <option value={options.option2}>{options.option2}</option>
                <option value={options.option3}>{options.option3}</option>
                <option value={options.option4}>{options.option4}</option>
              </select>
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
                Update Question
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditQuestionModal;
