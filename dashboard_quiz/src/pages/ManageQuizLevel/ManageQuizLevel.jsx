import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import FilterCategory from "./FilterCategory/FilterCategory";
import Modal from "../../components/Modal";
import LevelAddModal from "./LevelAddModal/LevelAddModal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import EditLevelModal from "./EditLevelModal/EditLevelModal";
import { getAllCategory } from "../../services/category/category";
import { useQuery } from "@tanstack/react-query";
import { baseURL, imageBaseURL } from "../../config";
import { getAllLevelByCategoryId } from "../../services/level/level";
import useCategory from "../../hooks/useCategory";
import useLevel from "../../hooks/useLevel";

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Level Name", key: "name" },
  { name: "Quiz Duration (m)", key: "duration" },
  { name: "Per Question Mark", key: "perQuestionMark" },
  { name: "Negative Answer Mark", key: "negativeAnswerMark" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status1" },
];

const ManageQuizLevel = () => {
  const [allLevelData, setAllLevelData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState({});

  const { allCategoryData } = useCategory();
  const { levelData, handleUpdateLevel } = useLevel(slectCategory);

  useEffect(() => {
    if (allCategoryData?.length > 0) {
      setSlectCategory(allCategoryData?.[0]?.id);
    }
  }, [allCategoryData]);

  useEffect(() => {
    if (levelData?.data?.data?.length > 0) {
      const tempData = levelData?.data?.data?.map((item, index) => {
        return {
          id: item._id,
          image: `${imageBaseURL}${item?.image}`,
          priority: item?.priority,
          name: item?.name,
          duration: item?.duration,
          perQuestionMark: item?.perQuestionMark,
          negativeAnswerMark: item?.negativeAnswerMark,
          status1: item?.status === "deactive" ? "Deactive" : "Active",
        };
      });
      setAllLevelData(tempData);
      setFilterData(tempData);
    } else {
      setAllLevelData([]);
      setFilterData([]);
    }
  }, [levelData?.data?.data, slectCategory]);

  const handleActionClick = async (type, id) => {
    let clickLevel = filterData?.find((item) => item.id == id);

    setSelectedLevel(clickLevel);

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

  const deleteFoodUpdate = (level) => {
    console.log({ level });
    setShowDeleteModal(false);
  };

  return (
    <div className="w-[100%]">
      <FilterCategory
        allLevelData={allLevelData}
        setAddModal={setAddModal}
        allCategoryData={allCategoryData}
        slectCategory={slectCategory}
        setSlectCategory={setSlectCategory}
        setFilterData={setFilterData}
      />
      <Table
        title={"All   Level List"}
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
          title={"Level Add"}
          setModal={setAddModal}
          body={
            <LevelAddModal
              setModal={setAddModal}
              allCategoryData={allCategoryData}
            />
          }
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[900px]"}
          title={selectedLevel.name}
          setModal={setShowEditModal}
          body={
            <EditLevelModal
              level={selectedLevel}
              setModal={setShowEditModal}
              allCategoryData={allCategoryData}
              handleUpdateLevel={handleUpdateLevel}
            />
          }
        />
      )}

      {showDeleteModal && (
        <Modal
          width={"w-[500px]"}
          title={selectedLevel.name}
          setModal={setShowDeleteModal}
          body={
            <DeleteConfirmModalBody
              title={`Delete   ${selectedLevel.name}`}
              onDeleteItem={() => deleteFoodUpdate(selectedLevel)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageQuizLevel;
