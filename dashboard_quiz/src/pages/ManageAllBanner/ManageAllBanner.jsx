import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import EditBannerModalBody from "./EditBannerModalBody/EditBannerModalBody";
import {
  deleteBanner,
  getAllBanner,
  updateBanner,
} from "../../services/banner/banner";
import AddBannerModal from "./AddBannerModal/AddBannerModal";

const tableHeader = [
  { name: "Image", key: "image" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
];

const ManageAllBanner = () => {
  const [allBannerData, setAllBannerData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({});
  const [showAddModal, setAddModal] = useState(false);

  const queryClient = useQueryClient();

  const { data: { data: { data } } = { data: { data: null } } } = useQuery({
    queryKey: ["allBanner"],
    queryFn: getAllBanner,
  });

  //   console.log({ data });

  const updateBannerMutation = useMutation({
    mutationFn: updateBanner,
  });

  const deleteBannerMutation = useMutation({
    mutationFn: deleteBanner,
  });

  useEffect(() => {
    // console.log({ bandata: data });
    if (data?.length > 0) {
      const tempData = data?.map((item, index) => {
        return {
          id: item._id,
          image: item?.image?.publicUrl,
          priority: item?.priority,
          status: item?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setAllBannerData(tempData);
    } else {
      setAllBannerData([]);
    }
  }, [data]);

  const handleBannerUpdate = ({ banner, updateData }) => {
    // console.log({ banner, updateData });
    setShowEditModal(false);
    updateBannerMutation.mutate(
      {
        id: banner._id,
        updateData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allBanner"]);
          toast.success("Update successfully");
        },
        onError: (err) => {},
      }
    );
  };

  const deleteBannerUpdate = (banner) => {
    console.log({ bannerDelete: banner });
    setShowDeleteModal(false);
    deleteBannerMutation.mutate(
      {
        id: banner._id,
      },
      {
        onSuccess: (data) => {
          console.log("Success");
          console.log({ data });
          queryClient.invalidateQueries(["allBanner"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };

  const handleActionClick = async (type, id) => {
    // console.log({ type, id });

    let clickBanner = data?.find((banner) => banner._id == id);
    // console.log({ clickBanner });

    setSelectedBanner(clickBanner);

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

  console.log({ allBannerData });

  return (
    <div className="w-[100%]">
      <div className="mb-4 px-4 flex  justify-end gap-4 items-end">
        <button
          onClick={() => setAddModal(true)}
          className="bg-green-700 p-2 text-xl font-semibold rounded-md"
        >
          Add New Banner
        </button>
      </div>
      <Table
        title={"All Banners"}
        data={allBannerData ?? []}
        headers={tableHeader}
        actions={true}
        actionName={"Actions"}
        handleActionClick={handleActionClick}
        actionValue={{ edit: true, delete: true }}
      />

      {showAddModal && (
        <Modal
          width={"w-[900px]"}
          title={"New Banner Add"}
          setModal={setAddModal}
          body={<AddBannerModal />}
        />
      )}

      {showEditModal && (
        <Modal
          width={"w-[500px]"}
          title=""
          setModal={setShowEditModal}
          body={
            <EditBannerModalBody
              banner={selectedBanner}
              onUpdate={handleBannerUpdate}
            />
          }
        />
      )}

      {showDeleteModal && (
        <Modal
          width={"w-[500px]"}
          title={""}
          setModal={setShowDeleteModal}
          body={
            <DeleteConfirmModalBody
              title={`One item  delete from ${selectedBanner.BannerType}`}
              onDeleteItem={() => deleteBannerUpdate(selectedBanner)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageAllBanner;
