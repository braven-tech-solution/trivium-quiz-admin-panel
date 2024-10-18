import { useState } from "react";
import dayjs from "dayjs";
import { ConfigProvider, Select } from "antd";
import Area_Chart from "../Chart/AreaChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserStatistic } from "../../services/user/user";

const UserChart = () => {
  const [selectedYearArea, setSelectedYearArea] = useState(dayjs().year());
  const [selectedYearBar, setSelectedYearBar] = useState(dayjs().year());

  const queryClient = useQueryClient();

  const { data: { data: userStatisticData } = { data: null } } = useQuery({
    queryKey: ["userStatistic", selectedYearArea], // Use selectedYearArea in the query key for better caching
    queryFn: () => getUserStatistic(selectedYearArea),
  });

  //   console.log(userStatisticData);
  //   console.log({ selectedYearArea });

  const handleYearChangeArea = (value) => {
    // console.log({ value });
    setSelectedYearArea(value);

    queryClient.invalidateQueries(["userStatistic"]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-2">
      <div className="w-full px-3 bg-[#293b44] rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between text-white mt-4">
          <div>
            <p className="text-base">User Overview</p>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-xs sm:text-base">Account Type:</p>
              <p className="font-bold text-xs md:text-xl">User</p>
            </div>
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBgContainer: "rgb(41,59,68)",
                      colorText: "rgba(255,250,250,0.88)",
                      colorBgElevated: "rgb(117,136,136)",
                      colorIcon: "rgb(255,255,255)",
                      colorBorder: "rgb(255,251,251)",
                    },
                  },
                }}
              >
                <Select
                  defaultValue={selectedYearArea.toString()}
                  // style={{ width: 120 }}
                  className="w-[75px] lg:w-20"
                  onChange={handleYearChangeArea}
                  options={[
                    { value: "2024", label: "2024" },
                    { value: "2023", label: "2023" },
                    { value: "2022", label: "2022" },
                    { value: "2021", label: "2021" },
                  ]}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div>
          <Area_Chart data={userStatisticData} />
        </div>
      </div>

      {/* <div className="w-full px-3 bg-[#293b44] rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between text-white mt-4">
              <p className="text-base">Earning Overview</p>
              <div className="flex items-center sm:gap-4 justify-between">
                <div className="flex gap-1 sm:gap-2 items-center">
                  <p className="text-xs sm:text-base">Monthly Growth</p>
                  <p className="font-bold text-xs md:text-xl text-lime-500">
                    35.80%
                  </p>
                </div>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          colorBgContainer: "rgb(41,59,68)",
                          colorText: "rgba(255,250,250,0.88)",
                          colorBgElevated: "rgb(117,136,136)",
                          colorIcon: "rgb(255,255,255)",
                        },
                      },
                    }}
                  >
                    <Select
                      defaultValue={selectedYearArea.toString()}
                      // style={{ width: 120 }}
                      className="w-[74px] lg:w-20"
                      onChange={handleYearChangeBar}
                      options={[
                        { value: "2024", label: "2024" },
                        { value: "2023", label: "2023" },
                        { value: "2022", label: "2022" },
                        { value: "2021", label: "2021" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
            <div>
              <Bar_Chart data={barUserStatistics} />
            </div>
          </div> */}
    </div>
  );
};

export default UserChart;
