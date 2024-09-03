/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const FilterQuestion = ({
  originalData,
  setFilterData,
  setAddModal,
  filterOption,
  slectCategory,
  setSlectCategory,
  allCategoryData,
  allLevelData,
}) => {
  const [checkstatus, setCheckStatus] = useState("");
  const [levelOption, setLevelOption] = useState([]);
  const [selectLevelId, setSelectLevelId] = useState("");

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
    }
  }, [allCategoryData, allLevelData]);

  const handleCategoryChange = (event) => {
    const clickCategory = event.target.value;
    setSlectCategory(clickCategory);

    let level = allLevelData?.filter(
      (item) => item?.category === clickCategory
    );

    console.log(level);
    setLevelOption(level);

    // console.log(clickCategory);
  };

  const handleLevelChange = (event) => {
    const clicLevel = event.target.value;
    setSelectLevelId(clicLevel);
    // setSlectCategory(clickCategory);

    // let level = allLevelData?.filter(
    //   (item) => item?.category === clickCategory
    // );

    // setLevelOption(level);

    // console.log(clickCategory);
  };

  console.log({ selectLevelId });

  const handleStatusChange = (event) => {
    const checkstatus = event.target.value;
    setCheckStatus(checkstatus);

    let categoryData = originalData.find(
      (item) => item?.name === slectCategory
    );

    let options = categoryData?.questions?.filter(
      (item) => item?.status === checkstatus
    );

    if (checkstatus === "all") {
      options = categoryData?.questions;
    }

    // console.log(tempData);
    // console.log(filterType);

    setFilterData(options);
  };

  // console.log(slectCategory);
  return (
    <div className="mb-4 px-4 flex  justify-between gap-4 items-end">
      <div className="flex gap-5">
        <div>
          <label
            htmlFor="Category"
            className="block text-sm font-medium text-gray-700"
          >
            Filter Quiz Category
          </label>
          <select
            id="Category"
            name="Category"
            value={slectCategory}
            onChange={handleCategoryChange}
            className="mt-1   w-60 text-slate-600 pl-3  p-2 bg-white  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
          >
            <option selected disabled className="py-2">
              Select Category
            </option>
            {allCategoryData?.map((option) => (
              <option key={option.id} value={option.id} className="py-2">
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="Level"
            className="block text-sm font-medium text-gray-700"
          >
            Filter Quiz Level
          </label>
          <select
            id="Level"
            name="Level"
            value={selectLevelId}
            onChange={handleLevelChange}
            className="mt-1   w-60 text-slate-600 pl-3  p-2 bg-white  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
          >
            {levelOption?.map((option) => (
              <option key={option._id} value={option._id} className="py-2">
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
        Add New Question
      </button>
    </div>
  );
};

export default FilterQuestion;
