import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import FilterStatus from "./FilterStatus/FilterStatus";
import EditScheduleQuizModal from "./EditScheduleQuizModal/EditScheduleQuizModal";
import { useQuery } from "@tanstack/react-query";
import { getAllLiveQuiz } from "../../services/liveQuiz/liveQuiz";
import { baseURL, imageBaseURL } from "../../config";
import { useLiveQuiz } from "../../hooks/useLiveQuiz";
import LiveQuizAddModal from "./LiveQuizAddModal/LiveQuizAddModal";
import { getFormattedDate } from "../../utils/dateFormate";

const tableHeader = [
  { name: "Quiz_Name", key: "name" },
  { name: "Image", key: "image" },
  { name: "Time", key: "startTime" },
  { name: "Time", key: "endTime" },
  { name: "Total Questions", key: "numberOfQuestion" },
  { name: "Per Q. Mark", key: "perQuestionMark" },
  { name: "Negative Answer Mark", key: "negativeAnswerMark" },
  { name: "Require Point", key: "requirePoint" },
  { name: "Submited Quiz", key: "totalCompleteQuiz" },
  { name: "Average Strength", key: "averageStrength" },
  { name: "Status", key: "status" },
];

const ManageSchedule = () => {
  const [allLevelData, setAllLevelData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const { liveQuiz, liveQuizDelete } = useLiveQuiz();

  useEffect(() => {
    // console.log({ bandata: data });
    // console.log(imageBaseURL);
    // console.log(liveQuiz?.data);
    if (liveQuiz?.data?.length > 0) {
      // console.log(liveQuiz?.data);
      const tempData = liveQuiz?.data?.map((item, index) => {
        return {
          ...item,
          id: item._id,
          startTime: getFormattedDate(item.startTime),
          endTime: getFormattedDate(item.endTime),
          image: `${imageBaseURL}${item?.image}`,
          status: item?.status === "deactive" ? "Deactive" : "Active",
        };
      });

      // console.log(tempData);
      setAllLevelData(tempData);
      setFilterData(tempData);
    } else {
      setAllLevelData([]);
      setFilterData([]);
    }
  }, [liveQuiz?.data, selectedCategory]);

  const handleActionClick = async (type, id) => {
    console.log(type, id);
    let clickCategory = filterData?.find((food) => food.id == id);
    console.log(clickCategory);

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

  const deleteFoodUpdate = (selectedLiveQuiz) => {
    setShowDeleteModal(false);
    liveQuizDelete(selectedLiveQuiz);
  };

  // console.log(filterData);

  return (
    <div className="w-[100%]">
      <FilterStatus
        originalData={allLevelData}
        setFilterData={setFilterData}
        setAddModal={setAddModal}
      />

      <Table
        title={"All Live Quiz's List"}
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
          title={"New Live Quiz Add"}
          setModal={setAddModal}
          body={<LiveQuizAddModal setModal={setAddModal} />}
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[900px]"}
          title={selectedCategory.name}
          setModal={setShowEditModal}
          body={
            <EditScheduleQuizModal
              scheduleQuiz={selectedCategory}
              setModal={setShowEditModal}
            />
          }
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

export default ManageSchedule;
