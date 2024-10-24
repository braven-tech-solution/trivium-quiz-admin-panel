import { useEffect, useState } from "react";
import { useLiveQuiz } from "../../hooks/useLiveQuiz";
import FilterQuestion from "./FilterQuestion/FilterQuestion";
import Table from "../../components/Table/Table";

const ManageLiveQuizQuestion = () => {
  const [filterData, setFilterData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");

  const { liveQuiz } = useLiveQuiz();

  const { allQuestionData } = useAllQuestion();

  useEffect(() => {
    console.log(liveQuiz?.data?.length);
    if (liveQuiz?.data?.length > 0) {
      console.log(liveQuiz?.data?.[0]?._id);
      setSlectCategory(liveQuiz?.data?.[0]?._id);
    }
  }, [liveQuiz?.data]);

  useEffect(() => {
    if (allQuestionData?.length > 0) {
      let question = liveQuiz?.data?.[0] || [];

      setSlectCategory(allCategoryData?.[0]?.id);
      setFilterData(question);
    } else {
      setFilterData([]);
    }
  }, [allQuestionData, allCategoryData, liveQuiz?.data]);

  // console.log(liveQuiz?.data);
  return (
    <div className="w-[100%]">
      <FilterQuestion
        setAddModal={setAddModal}
        allLiveQuiz={liveQuiz?.data}
        slectCategory={slectCategory}
        setSlectCategory={setSlectCategory}
        setFilterData={setFilterData}
      />

      {/* <Table
        title={"All Live Quiz Category List"}
        data={filterData ?? []}
        headers={tableHeader}
        // actions={true}
        // actionName={"Actions"}
        handleActionClick={handleActionClick}
        // actionValue={{ edit: true, delete: true }}
      /> */}
    </div>
  );
};

export default ManageLiveQuizQuestion;
