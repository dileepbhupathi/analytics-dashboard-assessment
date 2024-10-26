import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./vehicle-manufacturer-bar-chart.scss";
import NOData from "../no-data/no-data";

const VehicleManufactureBarChart = () => {
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const aggregatedData = filteredEVData.reduce((acc, vehicle) => {
    const make = vehicle.Make;
    if (!acc[make]) {
      acc[make] = { name: make, count: 0 };
    }
    acc[make].count++;
    return acc;
  }, {});

  const barChartData = Object.values(aggregatedData);
  const filteredBarChartData = barChartData.filter(
    (each) => each.name !== undefined,
  );

  return (
    <div className="chart-wrapper">
      <h1 className="chart-title">Distribution of Electric Vehicle Makes:</h1>
      {filteredEVData.length > 0 ? (
        <div className="bar-chart-wrapper">
          <ResponsiveContainer>
            <BarChart
              data={filteredBarChartData}
              margin={{ top: 20, right: 30, bottom: 80, left: 20 }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                fontSize={10}
              />
              <YAxis fontSize={10} />
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <NOData />
      )}
    </div>
  );
};

export default VehicleManufactureBarChart;
