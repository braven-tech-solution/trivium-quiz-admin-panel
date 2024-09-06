import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import FilterCategory from "./FilterCategory/FilterCategory";
import Modal from "../../components/Modal";
import CategoryAddModal from "./CategoryAddModal/CategoryAddModal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import { getAllCategory } from "../../services/category/category";
import { useQuery } from "@tanstack/react-query";
import { baseURL, imageBaseURL } from "../../config";

const originalData = [
  {
    name: "Flutter",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",
    id: "1",
    priority: 1,
    status: "deactive",
  },
  {
    name: "React",
    image:
      "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg",

    id: "2",
    priority: 2,
    status: "active",
  },
];

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Category Name", key: "name" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
];

const ManageQuizCategory = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [showAddModal, setAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const { data: { data: { data } } = { data: { data: null } } } = useQuery({
    queryKey: ["allCategory"],
    queryFn: getAllCategory,
  });

  useEffect(() => {
    console.log({ bandata: data });
    console.log(imageBaseURL);
    if (data?.length > 0) {
      const tempData = data?.map((item, index) => {
        return {
          id: item._id,
          image: `${imageBaseURL}${item?.image}`,
          priority: item?.priority,
          name: item?.name,
          perQuestionMark: item?.perQuestionMark,
          negativeAnswerMark: item?.negativeAnswerMark,
          status: item?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setAllCategoryData(tempData);
      setFilterData(tempData);
    } else {
      setAllCategoryData([]);
      setFilterData([]);
    }
  }, [data]);

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

  // console.log(data);

  return (
    <div className="w-[100%]">
      <FilterCategory
        originalData={originalData}
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
        // actionValue={{ edit: true, delete: true }}
      />

      {showAddModal && (
        <Modal
          width={"w-[900px]"}
          title={"Category Add"}
          setModal={setAddModal}
          body={<CategoryAddModal />}
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

export default ManageQuizCategory;
