import React from "react";
import { Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import "./ev-grid-table.scss";
import { updateFilteredEVData } from "../../store/reducers/reducers";
import NOData from "../no-data/no-data";

const EVGridTable = () => {
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const evData = useSelector((state) => state.evReducer.evData);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Vehicle ID",
      dataIndex: "DOL Vehicle ID",
      key: "DOL Vehicle ID",
    },
    {
      title: "VIN (1-10)",
      dataIndex: "VIN (1-10)",
      key: "VIN (1-10)",
    },
    {
      title: "EV Model",
      dataIndex: "Model",
      key: "Model",
      width: "7%",
    },
    {
      title: "EV Make",
      dataIndex: "Make",
      key: "Make",
    },
    {
      title: "EV Type",
      dataIndex: "Electric Vehicle Type",
      key: "Electric Vehicle Type",
    },
    {
      title: "County",
      dataIndex: "County",
      key: "County",
    },
    {
      title: "CAFV Eligibility",
      dataIndex: "Clean Alternative Fuel Vehicle (CAFV) Eligibility",
      key: "Clean Alternative Fuel Vehicle (CAFV) Eligibility",
    },
    {
      title: "Model Year",
      dataIndex: "Model Year",
      key: "Model Year",
    },
    {
      title: "ELectric Utility",
      dataIndex: "Electric Utility",
      key: "Electric Utility",
    },
    {
      title: "Postal Code",
      dataIndex: "Postal Code",
      key: "Postal Code",
    },
  ];
  const handleSearch = (event) => {
    if (event.target.value) {
      const SearchedData = evData.filter(
        (each) =>
          each.Make !== undefined &&
          each.Make.toLowerCase().includes(event.target.value),
      );
      dispatch(updateFilteredEVData(SearchedData));
    } else {
      dispatch(updateFilteredEVData(evData));
    }
  };
  return (
    <div className="ev-grid-section">
      <div className="search-bar-wrapper">
        <h3 className="grid-data-title">Electric Vehicle Dataset Overview:</h3>
        <Input
          placeholder="search by make"
          className="search-bar"
          suffix={<SearchOutlined />}
          onChange={handleSearch}
        />
      </div>
      {filteredEVData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredEVData}
          scroll={{
            x: "max-content",
            y: 70 * 5,
          }}
        />
      ) : (
        <NOData />
      )}
    </div>
  );
};

export default EVGridTable;
