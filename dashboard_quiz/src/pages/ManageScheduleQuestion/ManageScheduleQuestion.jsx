import { useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import FilterStatus from "./FilterStatus/FilterStatus";
import ScheduleQuizAddModal from "./ScheduleQuizAddModal/ScheduleQuizAddModal";
import EditScheduleQuizModal from "./EditScheduleQuizModal/EditScheduleQuizModal";

const originalData = [
  {
    name: "JavaScript",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",
    id: "1",
    status: "deactive",
    time: "August 11, 2024 1:30 PM",
    perQuestionMark: 1,
    negativeAnswerMark: 0.25,
  },
  {
    name: "Java",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",

    id: "2",
    status: "active",
    time: "August 13, 2024 1:30 PM",
    perQuestionMark: 1,
    negativeAnswerMark: 0.25,
  },
];

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Quiz  Name", key: "name" },
  { name: "Time", key: "time" },
  { name: "Status", key: "status" },
];

const ManageScheduleQuestion = () => {
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState(originalData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleActionClick = async (type, id) => {
    let clickCategory = filterData?.find((food) => food.id == id);
    console.log({ clickCategory });

    setSelectedCategory(clickCategory);

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

  return (
    <div className="w-[100%]">
      <FilterStatus
        originalData={originalData}
        setFilterData={setFilterData}
        setAddModal={setAddModal}
      />

      <Table
        title={"All Quiz Schedule List"}
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
          title={"Schedule Quiz Add"}
          setModal={setAddModal}
          body={<ScheduleQuizAddModal />}
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[900px]"}
          title={selectedCategory.name}
          setModal={setShowEditModal}
          body={<EditScheduleQuizModal scheduleQuiz={selectedCategory} />}
        />
      )}

      {showDeleteModal && (
        <Modal
          width={"w-[500px]"}
          title={selectedCategory.name}
          setModal={setShowDeleteModal}
          body={
            <DeleteConfirmModalBody
              title={`Delete   ${selectedCategory.name}`}
              onDeleteItem={() => deleteFoodUpdate(selectedCategory)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageScheduleQuestion;
