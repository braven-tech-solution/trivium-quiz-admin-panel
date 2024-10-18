import { ConfigProvider, Select } from "antd";
import DashboardStatistic from "../../components/Dashboard/DashboardStatistic";
import UserChart from "../../components/Dashboard/UserChart";

const DashBoard = () => {
  return (
    <div className="  ">
      <DashboardStatistic />
      <UserChart />
    </div>
  );
};

export default DashBoard;
