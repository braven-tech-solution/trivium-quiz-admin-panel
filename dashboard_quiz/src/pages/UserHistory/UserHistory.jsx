import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import DeleteConfirmModalBody from "../../components/DeleteConfirmModalBody/DeleteConfirmModalBody";
import { getAllUsersInfo } from "../../services/user/user";
import { useQuery } from "@tanstack/react-query";

const tableHeader = [
  { name: "Name", key: "fullName" },
  { name: "Email", key: "email" },
  { name: "Phone", key: "phone" },
  { name: "Total Point", key: "point" },
  { name: "Total Participate", key: "completeQuiz" },
  { name: "Strength", key: "strength" },
  { name: "Status", key: "status" },
];

const UserHistory = () => {
  const [filterData, setFilterData] = useState([]);

  const { data: { data: allUserData } = { data: null } } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsersInfo,
  });

  useEffect(() => {
    if (allUserData?.length > 0) {
      const tempData = allUserData?.map((user, index) => {
        return {
          id: user._id,
          fullName: user?.fullName,
          email: user?.email,
          phone: user?.phone,
          point: user?.point || 0,
          completeQuiz: user?.completeQuiz,
          strength: `${user?.strength}%`,
          status: user?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setFilterData(tempData);
    } else {
      setFilterData([]);
    }
  }, [allUserData]);

  console.log(allUserData);

  return (
    <div className="w-[100%]">
      <Table
        title={"All Users List"}
        data={filterData ?? []}
        headers={tableHeader}
        actions={false}
      />
    </div>
  );
};

export default UserHistory;
