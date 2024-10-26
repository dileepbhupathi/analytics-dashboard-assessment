import { Button } from "antd";
import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { updateFilteredEVData } from "../../store/reducers/reducers";
import FilterSidebar from "../filter-sidebar/filter-sidebar";
import "./header-section.scss";

const HeaderSection = () => {
  const dispatch = useDispatch();
  const evData = useSelector((state) => state.evReducer.evData);
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const downloadXLSX = (data, filename = "data.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleFilterChange = (filters) => {
    const { selectedMakes, selectedYears, selectedTypes } = filters;

    const filtered = evData.filter((item) => {
      return (
        (selectedMakes.length === 0 || selectedMakes.includes(item.Make)) &&
        (selectedYears.length === 0 ||
          selectedYears.includes(item["Model Year"])) &&
        (selectedTypes.length === 0 ||
          selectedTypes.includes(item["Electric Vehicle Type"]))
      );
    });
    dispatch(updateFilteredEVData(filtered));
  };
  return (
    <div className="header-section-wrapper">
      <div className="logo-title-section">
        <img src="/ev-logo.png" alt="ev-logo" className="logo" />
        <h3 className="title">Eelectric vehicle analytics</h3>
      </div>

      <div className="filter-export-buttons-wrapper">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={() => downloadXLSX(filteredEVData, "EV_Data.xlsx")}
          className="export-button"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
