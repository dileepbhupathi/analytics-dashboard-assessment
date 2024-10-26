import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ev-distribution-types-pie-chart.scss";
import NOData from "../no-data/no-data";

const EVDistributionTypesPieChart = () => {
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const aggregatedData = filteredEVData.reduce((acc, vehicle) => {
    const type = vehicle["Electric Vehicle Type"];
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {});

  const pieChartData = Object.keys(aggregatedData).map((key) => ({
    name: key,
    value: aggregatedData[key],
  }));
  const FIlteredPieChartData = pieChartData.filter(
    (each) => each.name !== "undefined",
  );

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="chart-wrapper">
      <h1 className="chart-title">Electric Vehicle Type Composition:</h1>
      {filteredEVData.length > 0 ? (
        <div className="pie-chart-wraper">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={FIlteredPieChartData}
                cx={160}
                cy={150}
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="bottom"
                iconType="circle"
                iconSize={12}
                wrapperStyle={{ paddingLeft: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <NOData />
      )}
    </div>
  );
};

export default EVDistributionTypesPieChart;
