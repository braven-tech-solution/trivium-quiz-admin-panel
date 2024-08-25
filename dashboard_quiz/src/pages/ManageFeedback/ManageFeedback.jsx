import { useState, useRef } from "react";
import Table from "../../components/Table/Table";
import { tableHeader } from "../../data/feedbackTableHeader";
import FilterFeedback from "./FilterFeedback/FilterFeedback";
import ReactToPrint from "react-to-print";
import DataShowTable from "./DataShowTable/DataShowTable";

const ManageFeedback = () => {
  const [feedbackData, setFeedbackData] = useState();

  const componentRef = useRef();

  return (
    <>
      <FilterFeedback setFeedbackData={setFeedbackData} ref={componentRef} />

      <DataShowTable
        ref={componentRef}
        title={"All Feedback"}
        data={feedbackData ?? []}
        headers={tableHeader}
      />
    </>
  );
};

export default ManageFeedback;
