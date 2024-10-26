import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./electric-range-trends-line-chart.scss";
import NOData from "../no-data/no-data";

const ElectricRangeTrendsLineChart = () => {
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const aggregatedData = filteredEVData.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"];
    const range = vehicle["Electric Range"];

    if (!acc[year]) {
      acc[year] = { year: year, totalRange: 0, count: 0 };
    }
    acc[year].totalRange += range;
    acc[year].count++;

    return acc;
  }, {});

  const lineChartData = Object.keys(aggregatedData).map((key) => ({
    year: key,
    averageRange: aggregatedData[key].totalRange / aggregatedData[key].count,
  }));

  const filteredLineChartData = lineChartData.filter(
    (each) => each.year !== "undefined",
  );

  return (
    <div className="chart-wrapper">
      <h1 className="chart-title">EV Growth Over Model Years:</h1>
      {filteredEVData.length > 0 ? (
        <div className="line-chart-wrapper">
          <ResponsiveContainer>
            <LineChart data={filteredLineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Line type="monotone" dataKey="averageRange" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <NOData />
      )}
    </div>
  );
};

export default ElectricRangeTrendsLineChart;
