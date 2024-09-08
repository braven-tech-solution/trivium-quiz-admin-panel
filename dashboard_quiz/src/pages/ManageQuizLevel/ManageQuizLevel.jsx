import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import FilterCategory from "./FilterCategory/FilterCategory";
import Modal from "../../components/Modal";
import LevelAddModal from "./LevelAddModal/LevelAddModal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import EditCategoryModal from "./EditLevelModal/EditLevelModal";
import { getAllCategory } from "../../services/category/category";
import { useQuery } from "@tanstack/react-query";
import { baseURL, imageBaseURL } from "../../config";
import { getAllLevelByCategoryId } from "../../services/level/level";
import useCategory from "../../hooks/useCategory";

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Level Name", key: "name" },
  { name: "Quiz Duration (m)", key: "duration" },
  { name: "Per Question Mark", key: "perQuestionMark" },
  { name: "Negative Answer Mark", key: "negativeAnswerMark" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
];

const ManageQuizLevel = () => {
  const [allLevelData, setAllLevelData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slectCategory, setSlectCategory] = useState("");
  // const [categoryId, setCategoryId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState({});

  const { allCategoryData } = useCategory();
  // console.log(categoryData?.[0]?._id);

  const { data: levelData } = useQuery({
    queryKey: ["levelData", slectCategory],
    queryFn: () => getAllLevelByCategoryId(slectCategory),
  });

  useEffect(() => {
    // console.log("object");
    // console.log(allCategoryData?.length);

    if (allCategoryData?.length > 0) {
      // console.log(allCategoryData?.[0].id);
      setSlectCategory(allCategoryData?.[0]?.id);
    }
  }, [allCategoryData]);

  // console.log(levelData);

  useEffect(() => {
    // console.log({ bandata: data });
    // console.log(imageBaseURL);
    if (levelData?.data?.data?.length > 0) {
      console.log(levelData?.data?.data);
      const tempData = levelData?.data?.data?.map((item, index) => {
        return {
          id: item._id,
          image: `${imageBaseURL}${item?.image}`,
          priority: item?.priority,
          name: item?.name,
          duration: item?.duration,
          perQuestionMark: item?.perQuestionMark,
          negativeAnswerMark: item?.negativeAnswerMark,
          status: item?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setAllLevelData(tempData);
      setFilterData(tempData);
    } else {
      setAllLevelData([]);
      setFilterData([]);
    }
  }, [levelData?.data?.data, slectCategory]);

  console.log(levelData?.data);

  const handleActionClick = async (type, id) => {
    let clickLevel = filterData?.find((item) => item.id == id);
    // console.log({ clickCategory });

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

  const deleteFoodUpdate = (food) => {
    setShowDeleteModal(false);
  };

  // console.log(data);

  // console.log(slectCategory);

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
        title={"All Quiz Category List"}
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
          title={"Category Add"}
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
            <EditCategoryModal
              level={selectedLevel}
              setModal={setShowEditModal}
              allCategoryData={allCategoryData}
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

export default ManageQuizLevel;
