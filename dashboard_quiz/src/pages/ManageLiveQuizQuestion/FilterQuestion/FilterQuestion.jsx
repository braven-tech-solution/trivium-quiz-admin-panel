/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const FilterQuestion = ({
  setAddModal,
  allLiveQuiz,
  slectCategory,
  setSlectCategory,
}) => {
  // console.log({ slectCategory });
  // console.log(allLiveQuiz);
  const handleCategoryChange = (event) => {
    const clickCategory = event.target.value;
    // console.log({ clickCategory });
    setSlectCategory(clickCategory);
  };

  return (
    <div className="mb-4 px-4 flex  justify-between gap-4 items-end">
      <div>
        <label
          htmlFor="foodType"
          className="block text-sm font-medium text-gray-700"
        >
          Filter Quiz Category
        </label>
        <select
          id="foodType"
          name="foodType"
          value={slectCategory}
          onChange={handleCategoryChange}
          className="mt-1   w-60 text-slate-600 pl-3  p-2 bg-white  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
        >
          {allLiveQuiz?.map((option) => (
            <option key={option.name} value={option._id} className="py-2">
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setAddModal(true)}
        className="bg-green-700 p-2 text-xl font-semibold rounded-md"
      >
        Add New Question
      </button>
    </div>
  );
};

export default FilterQuestion;
