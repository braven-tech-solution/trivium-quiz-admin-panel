import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import QuestionAddModal from "./QuestionAddModal/QuestionAddModal";
import EditQuestionModal from "./EditQuestionModal/EditQuestionModal";
import useCategory from "../../hooks/useCategory";
import FilterQuestion from "./FilterQuestion/FilterQuestion";
import { getAllLevel } from "../../services/level/level";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestion } from "../../services/question/question";
import { useAllQuestion } from "../../hooks/useAllQuestion";

const tableHeader = [
  { name: "Title", key: "title" },
  { name: "Option", key: "option" },
  { name: "Correct Answer", key: "correctAnswer" },
  { name: "Status", key: "status" },
];

const ManageQuizQuestion = () => {
  const [originalData, setOriginalData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectLevelId, setSelectLevelId] = useState("");

  const { allCategoryData } = useCategory();

  const { data: { data: { data: allLevelData } } = { data: { data: null } } } =
    useQuery({
      queryKey: ["allLevelData"],
      queryFn: getAllLevel,
    });

  const { allQuestionData } = useAllQuestion();

  console.log(allQuestionData);

  useEffect(() => {
    if (allQuestionData?.length > 0) {
      // // console.log(allCategoryData[0]?.id);
      let level =
        allLevelData?.filter(
          (item) => item?.category === allCategoryData?.[0]?.id
        ) || [];

      let question =
        allQuestionData?.filter((item) => item?.model_id === level?.[0]?._id) ||
        [];

      setOriginalData(allQuestionData);
      setSlectCategory(allCategoryData?.[0]?.id);
      setFilterData(question);
    } else {
      setFilterData([]);
    }
  }, [allQuestionData, allCategoryData, allLevelData]);

  useEffect(() => {
    if (slectCategory && selectLevelId) {
      let level =
        allLevelData?.filter((item) => item?.category === slectCategory) || [];

      let question = allQuestionData?.filter(
        (item) => item?.model_id === selectLevelId
      );

      // // console.log(question);

      // // console.log("question");
      if (question) {
        setFilterData(question);
      } else {
        setFilterData([]);
      }
    }
  }, [slectCategory, selectLevelId]);

  // console.log({ slectCategory });
  // console.log({ selectLevelId });

  const handleActionClick = async (type, id) => {
    let clickQuestion = filterData?.find((item) => item.id == id);
    // // console.log({ clickQuestion });

    setSelectedQuestion(clickQuestion);

    switch (type) {
      case "edit":
        setShowEditModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const deleteFoodUpdate = (food) => {
    setShowDeleteModal(false);
  };

  const selectLeveldata = allLevelData?.find(
    (level) => level._id === selectLevelId
  );

  // console.log(selectLeveldata);

  return (
    <div className="w-[100%]">
      <FilterQuestion
        originalData={originalData}
        setFilterData={setFilterData}
        setAddModal={setAddModal}
        allCategoryData={allCategoryData}
        allLevelData={allLevelData}
        slectCategory={slectCategory}
        setSlectCategory={setSlectCategory}
        selectLevelId={selectLevelId}
        setSelectLevelId={setSelectLevelId}
      />
      <Table
        title={`${selectLeveldata?.name} Level Question List`}
        data={filterData ?? []}
        headers={tableHeader}
        actions={true}
        actionName={"Actions"}
        handleActionClick={handleActionClick}
        actionValue={{ edit: true, delete: true }}
      />

      {showAddModal && (
        <Modal
          width={"w-[900px]"}
          title={"Question Add"}
          setModal={setAddModal}
          body={
            <QuestionAddModal
              allCategoryData={allCategoryData}
              allLevelData={allLevelData}
              slectCategory={slectCategory}
              setSlectCategory={setSlectCategory}
              setModal={setAddModal}
            />
          }
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[900px]"}
          title={"Edit Question"}
          setModal={setShowEditModal}
          body={
            <EditQuestionModal
              question={selectedQuestion}
              allCategoryData={allCategoryData}
              slectCategory={slectCategory}
            />
          }
        />
      )}

      {showDeleteModal && (
        <Modal
          width={"w-[500px]"}
          title={selectedQuestion.title}
          setModal={setShowDeleteModal}
          body={
            <DeleteConfirmModalBody
              title={`Delete   ${selectedQuestion.title}`}
              onDeleteItem={() => deleteFoodUpdate(selectedQuestion)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageQuizQuestion;
