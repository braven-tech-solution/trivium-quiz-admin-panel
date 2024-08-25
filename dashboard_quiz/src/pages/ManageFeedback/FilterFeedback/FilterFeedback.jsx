import React, { useState } from "react";
import { getAllFeedback } from "../../../services/feedback/feedback";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { compareDate } from "../../../utils/compareDate";
import ReactToPrint from "react-to-print";

const FilterFeedback = ({ setFeedbackData }, ref) => {
  const [allFeedback, setAllFeedback] = useState();
  const [customerType, setCustomerType] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data: { data: { data } } = { data: { data: null } } } = useQuery({
    queryKey: ["allFeedback"],
    queryFn: getAllFeedback,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      const tempData = data?.map((item, index) => {
        console.log(item?.perInterestPayment);
        return {
          ...item,
          id: item._id,
          date: item?.date?.split("T")[0],
          createdAt: item?.createdAt?.split("T")[0],
        };
      });

      setFeedbackData(tempData);
      setAllFeedback(tempData);
    }
  }, [data]);

  const handleChange = (event) => {
    const filterType = event.target.value;
    setCustomerType(filterType);

    let tempData = allFeedback.filter(
      (feedback) => filterType === feedback?.customerType
    );

    if (filterType === "All") {
      tempData = allFeedback;
    }

    setFeedbackData(tempData);
  };

  const handlePhoneChange = (event) => {
    const phoneFilter = event.target.value;

    const tempData = allFeedback.filter((feedback) =>
      feedback?.phone.includes(phoneFilter)
    );

    setFeedbackData(tempData);

    console.log(phoneFilter);

    setPhone(phoneFilter);
  };

  const handleFilterDate = (startDate, endDate) => {
    let tempData = allFeedback;
    if (customerType != "All") {
      tempData = allFeedback.filter(
        (feedback) => customerType === feedback?.customerType
      );
    }

    let filterData = tempData?.filter(
      (feedback) =>
        compareDate(feedback?.createdAt, startDate) != -1 &&
        compareDate(feedback?.createdAt, endDate) != 1
    );
    setFeedbackData(filterData);
  };

  const handleStartdate = (e) => {
    setStartDate(e.target.value);
    handleFilterDate(e.target.value, endDate);
  };

  const handleEnddate = (e) => {
    setEndDate(e.target.value);
    handleFilterDate(startDate, e.target.value);
  };
  return (
    <div className="mb-4 px-4 flex  justify-start gap-4 items-end">
      <div>
        <label
          htmlFor="customerType"
          className="block text-sm font-medium text-gray-700"
        >
          Filter Customer Type
        </label>
        <select
          id="customerType"
          name="customerType"
          value={customerType}
          onChange={handleChange}
          className="mt-1   w-60 text-slate-600 pl-3  p-2   border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
        >
          <option value="" disabled>
            Please select
          </option>
          <option value="All">All</option>
          <option value="Retail">Retail</option>
          <option value="B2B">B2B</option>
          <option value="Corporate">Corporate</option>
        </select>
      </div>

      <div className="flex flex-col   ">
        <label className=" ml-2 font-semibold   capitalize text-purple-800   ">
          From :
        </label>
        <input
          type="date"
          name=""
          id=""
          className="text-black p-[7px] rounded-md focus:outline-0"
          value={startDate}
          onChange={handleStartdate}
        />
      </div>

      <div className="flex flex-col   ">
        <label className="ml-2  font-semibold capitalize text-red-800 ">
          To :
        </label>
        <input
          type="date"
          name=""
          id=""
          className="text-black p-[7px] rounded-md focus:outline-0"
          value={endDate}
          onChange={handleEnddate}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by Phone"
          value={phone}
          onChange={handlePhoneChange}
          className="mt-1   w-60 text-slate-600 pl-3  p-2   border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   rounded-md"
        />
      </div>

      <button
        className=" p-2  px-4 font-semibold    text-white 
    bg-gradient-to-br  from-orange-400 to-orange-700  hover:bg-gradient-to-bl  hover:from-orange-400 hover:to-orange-700 
    border border-transparent  hover:border-white  transition-colors duration-500 ease-linear"
      >
        <ReactToPrint
          trigger={() => <span>Export</span>}
          content={() => ref.current}
        />
      </button>
    </div>
  );
};

const forwardFeedback = React.forwardRef(FilterFeedback);

export default forwardFeedback;
