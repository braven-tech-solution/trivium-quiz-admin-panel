import { useForm } from "react-hook-form";
import Field from "../../../components/Field";
import { useEffect } from "react";

const EditFoodModalBody = ({ food, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    console.log(food);
    if (food?._id) {
      setValue("priority", food?.priority);
      setValue("isNew", food?.isNew ? "yes" : "no");
      setValue("foodType", food?.foodType);
      setValue("status", food?.status === "Deactive" ? "Deactive" : "Active");
    }
  }, [food?._id]);

  const submitForm = async (updateData) => {
    console.log(updateData);
    onUpdate({ food, updateData });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
        className="createBlog  "
      >
        <Field error={errors.priority} label={"Menu Item Priority ( 1 - 200 )"}>
          <input
            {...register("priority", {
              required: "Priority is Required",
              min: { value: 1, message: "Minimum value is 1" },
              max: { value: 200, message: "Maximum value is 200" },
            })}
            type="number"
            name="priority"
            id="priority"
            placeholder="Enter menu item priority"
            className="auth-input text-white"
            defaultValue="1"
          />
        </Field>

        <Field error={errors?.foodType} label={"Select Food Type"}>
          <select
            {...register("foodType", {
              required: "Food Type is Required",
            })}
            name="foodType"
            id="foodType"
            className="auth-input py-3 text-white"
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
                className="ml-2"
                {...register("isNew", {
                  required: "Please select an option",
                })}
              />
            </label>
          </div>
        </Field>

        <Field error={errors?.status} label={"Status"}>
          <div className="flex gap-4 auth-input  ">
            <label>
              <span className="text-green-600 auth-label">Active:</span>

              <input
                type="radio"
                value="Active"
                className="ml-2 "
                {...register("status", {
                  required: "Please select an option",
                })}
              />
            </label>
            <label>
              <span className="text-green-600 auth-label"> Deactive:</span>

              <input
                type="radio"
                value="Deactive"
                className="ml-2"
                {...register("status", {
                  required: "Please select an option",
                })}
              />
            </label>
          </div>
        </Field>

        {errors.isNew && <span>{errors.isNew.message}</span>}

        <Field>
          <button className="bg-green-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
            Update Food
          </button>
        </Field>
      </form>
    </div>
  );
};

export default EditFoodModalBody;
