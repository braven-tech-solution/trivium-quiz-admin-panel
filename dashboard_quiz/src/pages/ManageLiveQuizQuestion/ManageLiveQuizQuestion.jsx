import { useEffect, useState } from "react";
import { useLiveQuiz } from "../../hooks/useLiveQuiz";
import FilterQuestion from "./FilterQuestion/FilterQuestion";
import Table from "../../components/Table/Table";
import { useAllLiveQuestion } from "../../hooks/useAllLiveQuestion";
import Modal from "../../components/Modal";
import QuestionAddModal from "./QuestionAddModal/QuestionAddModal";

const tableHeader = [
  { name: "Title", key: "title" },
  { name: "Option", key: "option" },
  { name: "Correct Answer", key: "correctAnswer" },
  { name: "Status", key: "status" },
];

const ManageLiveQuizQuestion = () => {
  const [filterData, setFilterData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");

  const { liveQuiz } = useLiveQuiz();

  const { allLiveQuestionData } = useAllLiveQuestion();

  useEffect(() => {
    if (allLiveQuestionData?.length > 0 && liveQuiz?.data?.length > 0) {
      // console.log(liveQuiz?.data?.[0]?._id);
      // console.log(allLiveQuestionData);
      let questions =
        allLiveQuestionData?.filter(
          (item) => item?.model_id === liveQuiz?.data?.[0]?._id
        ) || [];
      // console.log(liveQuiz?.data?.[0]?._id);
      setSlectCategory(liveQuiz?.data?.[0]?._id);
      setFilterData(questions);
    } else {
      setFilterData([]);
    }
  }, [allLiveQuestionData, liveQuiz?.data]);

  useEffect(() => {
    // console.log(slectCategory);
    if (allLiveQuestionData?.length > 0 && liveQuiz?.data?.length > 0) {
      // console.log({ slectCategory });
      // console.log(allLiveQuestionData);
      let questions =
        allLiveQuestionData?.filter(
          (item) => item?.model_id === slectCategory
        ) || [];
      setFilterData(questions);
    } else {
      setFilterData([]);
    }
  }, [slectCategory]);

  const handleActionClick = async (type, id) => {
    let clickCategory = filterData?.find((food) => food.id == id);
    console.log({ clickCategory });

    // setSelectedCategory(clickCategory);

    switch (type) {
      case "edit":
        // setShowEditModal(true);
        break;
      case "delete":
        // setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[100%]">
      <FilterQuestion
        setAddModal={setAddModal}
        allLiveQuiz={liveQuiz?.data}
        slectCategory={slectCategory}
        setSlectCategory={setSlectCategory}
        setFilterData={setFilterData}
      />

      <Table
        title={"All Live Quiz Category List"}
        data={filterData ?? []}
        headers={tableHeader}
        // actions={true}
        // actionName={"Actions"}
        handleActionClick={handleActionClick}
        // actionValue={{ edit: true, delete: true }}
      />

      {showAddModal && (
        <Modal
          width={"w-[900px]"}
          title={"Question Add"}
          setModal={setAddModal}
          body={
            <QuestionAddModal
              liveQuiz={liveQuiz?.data}
              slectCategory={slectCategory}
              setSlectCategory={setSlectCategory}
              setModal={setAddModal}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageLiveQuizQuestion;
