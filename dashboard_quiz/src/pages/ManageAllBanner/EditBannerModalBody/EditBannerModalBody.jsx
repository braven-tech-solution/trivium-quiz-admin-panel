import { useForm } from "react-hook-form";
import Field from "../../../components/Field";
import { useEffect } from "react";

const EditBannerModalBody = ({ banner, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (banner?._id) {
      setValue("priority", banner?.priority);
      setValue("status", banner?.status === "Deactive" ? "Deactive" : "Active");
    }
  }, [banner?._id]);

  const submitForm = async (updateData) => {
    onUpdate({ banner, updateData });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
        className="createBlog  "
      >
        <Field error={errors.priority} label={"Item Priority ( 1 - 200 )"}>
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

        <Field>
          <button className="bg-green-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-[#2f727c] transition-all duration-200">
            Update Banner
          </button>
        </Field>
      </form>
    </div>
  );
};

export default EditBannerModalBody;
