import React from "react";
import "./no-data.scss";

const NOData = () => {
  return (
    <div className="no-data-wrapper">
      <img src="/no_data.svg" alt="no data" className="no-data-image" />
      <h3 className="no-data-title">No Data</h3>
    </div>
  );
};

export default NOData;
