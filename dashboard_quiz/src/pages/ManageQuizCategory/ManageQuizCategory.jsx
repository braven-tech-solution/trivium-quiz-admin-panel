import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import FilterCategory from "./FilterCategory/FilterCategory";
import Modal from "../../components/Modal";
import CategoryAddModal from "./CategoryAddModal/CategoryAddModal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import useCategory from "../../hooks/useCategory";

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Category Name", key: "name" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
];

const ManageQuizCategory = () => {
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const { allCategoryData, handleUpdateCategory, handleDeleteCategory } =
    useCategory();

  useEffect(() => {
    if (allCategoryData?.length > 0) {
      // setAllCategoryData(tempData);
      setFilterData(allCategoryData);
    } else {
      setFilterData([]);
    }
  }, [allCategoryData]);

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

  const deleteCategory = async (category) => {
    console.log(category);
    await handleDeleteCategory(category);
    setShowDeleteModal(false);
  };

  return (
    <div className="w-[100%]">
      <FilterCategory
        originalData={allCategoryData}
        setFilterData={setFilterData}
        setAddModal={setAddModal}
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
          title={"Category Add"}
          setModal={setAddModal}
          body={<CategoryAddModal setModal={setAddModal} />}
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[900px]"}
          title={selectedCategory.name}
          setModal={setShowEditModal}
          body={
            <EditCategoryModal
              category={selectedCategory}
              setModal={setShowEditModal}
              handleUpdateCategory={handleUpdateCategory}
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
              onDeleteItem={() => deleteCategory(selectedCategory)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageQuizCategory;
