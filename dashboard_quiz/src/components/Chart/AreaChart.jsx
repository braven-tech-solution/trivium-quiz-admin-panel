import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Area_Chart = ({ data }) => {
  // Assuming data format is an array of objects with month and earning properties

  console.log(data);
  const chartData =
    data?.map((item) => ({
      //   name: item.day,
      //   uv: item.monthly,
      month: item.month,
      users: item.user,
    })) || [];

  return (
    <div className="w-full h-[250px]  ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          // width={690}
          // height={350}
          data={chartData}
          margin={{
            top: 10,
          }}
        >
          <XAxis dataKey="month" tick={{ fill: "#FFFFFF" }} />
          <YAxis tick={{ fill: "#FFFFFF" }} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="month"
            stroke="#758888"
            fill="url(#colorUv)"
          />{" "}
          <Area
            type="monotone"
            dataKey="users"
            stroke="#758888"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
