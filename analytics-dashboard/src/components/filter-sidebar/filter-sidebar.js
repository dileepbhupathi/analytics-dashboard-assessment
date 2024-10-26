import React, { useState } from "react";
import { Button, Drawer, Checkbox, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilteredEVData,
  updateSelectedMakes,
  updateSelectedTypes,
  updateSelectedYears,
} from "../../store/reducers/reducers";

const { Option } = Select;

const FilterSidebar = ({ onFilterChange }) => {
  const evData = useSelector((state) => state.evReducer.evData);
  const [visible, setVisible] = useState(false);
  const selectedMakes = useSelector((state) => state.evReducer.selectedMakes);
  const selectedYears = useSelector((state) => state.evReducer.selectedYears);
  const selectedTypes = useSelector((state) => state.evReducer.selectedTypes);

  const dispatch = useDispatch();

  const uniqueMakes = [
    ...new Set(evData.map((item) => item?.Make || "")),
  ].sort();
  const uniqueYears = [
    ...new Set(evData.map((item) => item?.["Model Year"] || "")),
  ].sort();
  const uniqueTypes = [
    ...new Set(evData.map((item) => item?.["Electric Vehicle Type"] || "")),
  ].sort();

  const applyFilter = () => {
    onFilterChange({ selectedMakes, selectedYears, selectedTypes });
    setVisible(false);
  };

  const resetFilter = () => {
    dispatch(updateFilteredEVData(evData));
    dispatch(updateSelectedMakes([]));
    dispatch(updateSelectedTypes([]));
    dispatch(updateSelectedYears([]));
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={<FilterOutlined />}
        onClick={() => setVisible(true)}
        className="filter-button"
      >
        Filter
      </Button>
      <Drawer
        title="Filter Options"
        placement="left"
        onClose={() => setVisible(false)}
        open={visible}
        width={300}
      >
        <div style={{ marginBottom: 20 }}>
          <h4>Make</h4>
          <Checkbox.Group
            options={uniqueMakes.filter((make) => make !== "")}
            value={selectedMakes}
            onChange={(values) => dispatch(updateSelectedMakes(values))}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4>Model Year</h4>
          <Checkbox.Group
            options={uniqueYears.filter((year) => year !== "")}
            value={selectedYears}
            onChange={(values) => dispatch(updateSelectedYears(values))}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4>Electric Vehicle Type</h4>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Vehicle Type"
            value={selectedTypes}
            onChange={(values) => dispatch(updateSelectedTypes(values))}
          >
            {uniqueTypes.map(
              (type) =>
                type !== "" && (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ),
            )}
          </Select>
        </div>
        <div className="filter-reset-button-wrapper">
          <Button type="text" onClick={resetFilter} className="reset-button">
            Reset Filters
          </Button>
          <Button type="text" onClick={applyFilter} className="filter-button">
            Apply Filters
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
