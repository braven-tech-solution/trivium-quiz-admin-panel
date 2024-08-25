/* eslint-disable react/prop-types */
import { useState } from "react";

const FilterStatus = ({ originalData, setFilterData, setAddModal }) => {
  const [checkstatus, setCheckStatus] = useState("");

  const handleFoodTypeChange = (event) => {
    const checkstatus = event.target.value;
    setCheckStatus(checkstatus);

    let tempData = originalData.filter((item) => item?.status === checkstatus);

    if (checkstatus === "all") {
      tempData = originalData;
    }

    // console.log(tempData);
    // console.log(filterType);

    setFilterData(tempData);
  };
  return (
    <div className="mb-4 px-4 flex  justify-between gap-4 items-end">
      <div>
        <label
          htmlFor="foodType"
          className="block text-sm font-medium text-gray-700"
        >
          Filter Schedule Status
        </label>
        <select
          id="foodType"
          name="foodType"
          value={checkstatus}
          onChange={handleFoodTypeChange}
          className="mt-1   w-60 text-slate-600 pl-3  p-2  bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
        >
          <option value="all" className="py-2">
            All
          </option>
          <option value="active" className="py-2">
            Active
          </option>
          <option value="deactive">Deactive</option>
        </select>
      </div>

      <button
        onClick={() => setAddModal(true)}
        className="bg-green-700 p-2 text-xl font-semibold rounded-md"
      >
        Add New Schedule Quiz
      </button>
    </div>
  );
};

export default FilterStatus;
