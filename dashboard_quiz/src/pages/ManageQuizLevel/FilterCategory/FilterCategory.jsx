/* eslint-disable react/prop-types */
import React, { useState } from "react";

const FilterCategory = ({
  allLevelData,
  setAddModal,
  allCategoryData,
  slectCategory,
  setSlectCategory,
  setFilterData,
}) => {
  const [checkstatus, setCheckStatus] = useState("");

  const handleCategoryChange = (event) => {
    const clickCategory = event.target.value;
    console.log({ clickCategory });
    setSlectCategory(clickCategory);
  };

  const handleStatusChange = (event) => {
    // const checkstatus = event.target.value;
    // setCheckStatus(checkstatus);
    // let categoryData = allLevelData.find(
    //   (item) => item?.name === slectCategory
    // );
    // let options = categoryData?.questions?.filter(
    //   (item) => item?.status === checkstatus
    // );
    // if (checkstatus === "all") {
    //   options = categoryData?.questions;
    // }
    // // console.log(tempData);
    // // console.log(filterType);
    // setFilterData(options);
  };

  return (
    <div className="mb-4 px-4 flex  justify-between gap-4 items-end">
      <div className="flex gap-4">
        <div>
          <label
            htmlFor="foodType"
            className="block text-sm font-medium text-gray-700"
          >
            Filter Quiz Status
          </label>
          <select
            id="foodType"
            name="foodType"
            value={slectCategory}
            onChange={handleCategoryChange}
            className="mt-1   w-60 text-slate-600 pl-3  p-2 bg-white  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
          >
            {allCategoryData?.map((option) => (
              <option key={option.name} value={option.id} className="py-2">
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label
            htmlFor="foodType"
            className="block text-sm font-medium text-gray-700"
          >
            Filter Quiz Status
          </label>
          <select
            id="foodType"
            name="foodType"
            value={checkstatus}
            onChange={handleStatusChange}
            className="mt-1   w-60 text-slate-600 pl-3  p-2   bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
          >
            <option value="all" className="py-2">
              All
            </option>
            <option value="active" className="py-2">
              Active
            </option>
            <option value="deactive">Deactive</option>
          </select>
        </div> */}
      </div>

      <button
        onClick={() => setAddModal(true)}
        className="bg-green-700 p-2 text-xl font-semibold rounded-md"
      >
        Add New Level
      </button>
    </div>
  );
};

export default FilterCategory;
