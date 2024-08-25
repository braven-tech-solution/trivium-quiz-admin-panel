import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFood, getAllFood, updateFood } from "../../services/food/food";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import EditFoodModalBody from "./EditFoodModalBody/EditFoodModalBody";
import { toast } from "react-toastify";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import FilterAllFood from "./FilterAllFood/FilterAllFood";
import CreateFoodModal from "./CreateFoodModal/CreateFoodModal";

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Category", key: "category" },
  { name: "Is New", key: "isNew" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
];

const ManageAllFood = () => {
  const [allFoodData, setAllFoodData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState({});

  const queryClient = useQueryClient();

  const { data: { data: { data } } = { data: { data: null } } } = useQuery({
    queryKey: ["allFood"],
    queryFn: getAllFood,
  });

  const updateFoodMutation = useMutation({
    mutationFn: updateFood,
  });

  const deleteFoodMutation = useMutation({
    mutationFn: deleteFood,
  });

  useEffect(() => {
    if (data?.length > 0) {
      const tempData = data?.map((item, index) => {
        return {
          id: item._id,
          image: item?.image?.publicUrl,
          isNew: item?.isNew,
          priority: item?.priority,
          category: item?.foodType,
          status: item?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setAllFoodData(tempData);
      setMainData(tempData);
    }
  }, [data]);

  const handleFoodUpdate = ({ food, updateData }) => {
    console.log({ food, updateData });
    setShowEditModal(false);
    updateFoodMutation.mutate(
      {
        id: food._id,
        updateData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allFood"]);
          toast.success("Update successfully");
        },
        onError: (err) => {},
      }
    );
  };

  const deleteFoodUpdate = (food) => {
    console.log({ food });
    setShowDeleteModal(false);
    deleteFoodMutation.mutate(
      {
        id: food._id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allFood"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };

  const handleActionClick = async (type, id) => {
    console.log({ type, id });

    let clickFood = data?.find((food) => food._id == id);
    console.log({ clickFood });

    setSelectedFood(clickFood);

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

  return (
    <div className="w-[100%]">
      <FilterAllFood
        mainData={mainData}
        data={allFoodData ?? []}
        setAllFoodData={setAllFoodData}
        setAddModal={setAddModal}
      />

      <Table
        title={"All Foods"}
        data={allFoodData ?? []}
        headers={tableHeader}
        actions={true}
        actionName={"Actions"}
        handleActionClick={handleActionClick}
        actionValue={{ edit: true, delete: true }}
      />

      {showEditModal && (
        <Modal
          width={"w-[500px]"}
          title={selectedFood.foodType}
          setModal={setShowEditModal}
          body={
            <EditFoodModalBody
              food={selectedFood}
              onUpdate={handleFoodUpdate}
            />
          }
        />
      )}

      {showAddModal && (
        <Modal
          width={"w-[900px]"}
          title={"Food Add"}
          setModal={setAddModal}
          body={<CreateFoodModal />}
        />
      )}

      {showDeleteModal && (
        <Modal
          width={"w-[500px]"}
          title={selectedFood.foodType}
          setModal={setShowDeleteModal}
          body={
            <DeleteConfirmModalBody
              title={`One item  delete from ${selectedFood.foodType}`}
              onDeleteItem={() => deleteFoodUpdate(selectedFood)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageAllFood;
