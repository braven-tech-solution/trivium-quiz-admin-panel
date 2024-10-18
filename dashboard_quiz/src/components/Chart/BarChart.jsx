import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Bar_Chart = ({ data }) => {
  // Assuming data format is an array of objects with month and earning properties
  const chartData =
    data?.map((item) => ({
      name: item.day, // Assuming month names are in the 'month' property
      uv: item.monthly, // Assuming earnings are in the 'earning' property
    })) || [];

  return (
    <div className="lg:w-11/12 h-[250px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={690}
          // height={350}
          data={chartData}
          margin={{
            top: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#FFFFFF" }} />
          <YAxis tick={{ fill: "#FFFFFF" }} />
          <Bar type="monotone" dataKey="uv" stroke="#758888" fill="#758888" />
        </BarChart>{" "}
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
