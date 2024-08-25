import { useState } from "react";
import Table from "../../components/Table/Table";
import FilterCategory from "./FilterCategory/FilterCategory";
import Modal from "../../components/Modal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import QuestionAddModal from "./QuestionAddModal/QuestionAddModal";
import EditQuestionModal from "./EditQuestionModal/EditQuestionModal";

const originalData = [
  {
    name: "Flutter",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",
    id: "1",
    priority: 1,
    status: "deactive",
    perQuestionMark: 1,
    negativeAnswerMark: 0.25,
    questions: [
      {
        id: 1,
        title: "What is Flutter?",
        option: ["abs", "ccdd", "asd ge"],
        correct: "ccdd",
        status: "active",
      },
      {
        id: 2,
        title: "What is advantage of Flutter?",
        option: ["abs", "as asd as", "asd ge"],
        correct: "asd ge",
        status: "deactive",
      },
    ],
  },
  {
    name: "React",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",

    id: "2",
    priority: 2,
    status: "active",
    perQuestionMark: 1,
    negativeAnswerMark: 0.25,
    questions: [
      {
        id: 1,
        title: "What is React?",
        option: ["abs", "ccdd", "asd ge"],
        correct: "ccdd",
        status: "active",
      },
      {
        id: 2,
        title: "What is advantage of React?",
        option: ["abs", "as asd as", "asd ge"],
        correct: "asd ge",
        status: "active",
      },
    ],
  },
];

const tableHeader = [
  { name: "Title", key: "title" },
  { name: "Option", key: "option" },
  { name: "Correct Answer", key: "correct" },
  { name: "Status", key: "status" },
];

const ManageQuizQuestion = () => {
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState(originalData[0].questions);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const handleActionClick = async (type, id) => {
    let clickQuestion = filterData?.find((item) => item.id == id);
    // console.log({ clickQuestion });

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

  const filterOption = originalData.map((item) => item.name);

  return (
    <div className="w-[100%]">
      <FilterCategory
        originalData={originalData}
        setFilterData={setFilterData}
        setAddModal={setAddModal}
        filterOption={filterOption}
        slectCategory={slectCategory}
        setSlectCategory={setSlectCategory}
      />
      <Table
        title={"All Quiz Category List"}
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
          body={<QuestionAddModal filterOption={filterOption} />}
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
              filterOption={filterOption}
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
