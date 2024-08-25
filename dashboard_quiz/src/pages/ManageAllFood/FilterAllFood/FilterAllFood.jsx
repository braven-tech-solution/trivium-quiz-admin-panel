import { useState } from "react";

const FilterAllFood = ({ mainData, setAllFoodData, setAddModal }) => {
  const [foodType, setFoodType] = useState("");

  const handleFoodTypeChange = (event) => {
    const filterType = event.target.value;
    setFoodType(filterType);

    let tempData = mainData.filter((food) => food?.category === filterType);

    if (filterType === "all") {
      tempData = mainData;
    }

    // console.log(tempData);
    // console.log(filterType);

    setAllFoodData(tempData);
  };

  return (
    <div className="mb-4 px-4 flex  justify-between gap-4 items-end">
      <div>
        <label
          htmlFor="foodType"
          className="block text-sm font-medium text-gray-700"
        >
          Filter Food Type
        </label>
        <select
          id="foodType"
          name="foodType"
          value={foodType}
          onChange={handleFoodTypeChange}
          className="mt-1   w-60 text-slate-600 pl-3  p-2   border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
        >
          <option value="all" className="py-2">
            All
          </option>
          <option value="cakes" className="py-2">
            Cake
          </option>
          <option value="savoury">Savouries</option>
          <option value="bread">Bread</option>
          <option value="sweetTreat">Sweet Treat</option>
        </select>
      </div>

      <button
        onClick={() => setAddModal(true)}
        className="bg-green-700 p-2 text-xl font-semibold rounded-md"
      >
        Add New Food
      </button>
    </div>
  );
};

export default FilterAllFood;
