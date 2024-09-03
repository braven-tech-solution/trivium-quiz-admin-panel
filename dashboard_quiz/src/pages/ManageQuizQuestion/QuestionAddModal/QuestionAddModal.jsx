/* eslint-disable react/prop-types */
import editSvg from "../../../assets/icons/edit.svg";
import previewSvg from "../../../assets/icons/preview.svg";
import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

const QuestionAddModal = ({
  filterOption,
  allCategoryData,
  allLevelData,
  slectCategory,
  setSlectCategory,
}) => {
  const [option, setOption] = useState("");
  const [selectLevelId, setSelectLevelId] = useState("");

  const [levelOption, setLevelOption] = useState([]);

  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    if (allCategoryData.length > 0) {
      // console.log(allCategoryData);
      let level = allLevelData?.filter(
        (item) => item?.category === allCategoryData?.[0]?.id
      );

      // console.log(allCategoryData?.[0]?.id);
      // console.log(allLevelData);
      // console.log(level);
      setLevelOption(level);
      setSelectLevelId(level[0]._id);
      setValue("category", allCategoryData?.[0]?.id);
      setValue("level", level?.[0]?._id);
    }
  }, [allCategoryData, allLevelData]);

  const handleCategoryChange = (event) => {
    const clickCategory = event.target.value;
    // console.log({ clickCategory });
    setSlectCategory(clickCategory);

    let level = allLevelData?.filter(
      (item) => item?.category === clickCategory
    );

    // console.log(level);
    setLevelOption(level);

    // console.log("gh");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const submitForm = async (data) => {
    console.log(data);
  };

  return (
    <main className=" pt-4">
      <section>
        <div className="container">
          <form
            onSubmit={handleSubmit(submitForm)}
            autoComplete="off"
            className="createQuestion"
          >
            <Field error={errors?.category} label={"Select Category Type"}>
              <select
                {...register("category", {
                  required: "Category Type is Required",
                  onChange: (event) => handleCategoryChange(event),
                })}
                name="category"
                id="category"
                className="auth-input py-3"
              >
                {allCategoryData?.map((option) => (
                  <option key={option.id} value={option.id} className="py-2">
                    {option.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field error={errors?.level} label={"Select Level Type"}>
              <select
                {...register("level", {
                  required: "Level Type is Required",
                })}
                name="level"
                id="level"
                className="auth-input py-3"
              >
                {levelOption?.map((option) => (
                  <option key={option._id} value={option._id} className="py-2">
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
                className="auth-input  "
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
                className="auth-input  "
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
                className="auth-input  "
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
                className="auth-input  "
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
                className="auth-input py-3"
              >
                <option value={options.option1}>{options.option1}</option>
                <option value={options.option2}>{options.option2}</option>
                <option value={options.option2}>{options.option3}</option>
                <option value={options.option2}>{options.option4}</option>
              </select>
            </Field>

            <Field error={errors.priority} label={"Level Priority"}>
              <input
                {...register("priority", {
                  required: "Priority is Required ",
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
                Create New Question
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};

export default QuestionAddModal;
