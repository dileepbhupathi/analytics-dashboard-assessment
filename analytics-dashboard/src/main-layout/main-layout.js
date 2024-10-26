import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import dataFile from "../Electric_Vehicle_Population_Data.csv";
import { Col, Row } from "antd";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEVData, updateFilteredEVData } from "../store/reducers/reducers";
import VehicleManufactureBarChart from "../components/vehicle-manufacture0line-chart/vehicle-manufacturer-bar-chart";
import ElectricRangeTrendsLineChart from "../components/electric-range-trends-line-chart/electric-range-trends-line-chart";
import EVDistributionTypesPieChart from "../components/ev-distribution-types-pie-chart/ev-distribution-types-pie-chart";
import EVGridTable from "../components/ev-grid-table/ev-grid-table";
import HeaderSection from "../components/header-section/header-section";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { Spin } from "antd";

import "./main-layout.scss";

const MainLayout = () => {
  const dispatch = useDispatch();
  const filteredEVData = useSelector((state) => state.evReducer.filteredEVData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(dataFile)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            dispatch(updateEVData(results.data));
            dispatch(updateFilteredEVData(results.data));
            setLoading(false);
          },
        });
      });
  }, []);
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} className="spin" />;
  return loading ? (
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  ) : (
    <Layout className="ev-dasboard-wrapper">
      <Header className="header-wrapper">
        <HeaderSection />
      </Header>
      <Content className="content-section">
        <Row gutter={[20, 20]}>
          <Col lg={24}>
            <VehicleManufactureBarChart />
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={16}>
            <ElectricRangeTrendsLineChart />
          </Col>
          <Col xs={24} lg={8}>
            <EVDistributionTypesPieChart />
          </Col>
        </Row>
        <EVGridTable />
      </Content>
      <Footer>© 2024 Electric Vehicle Analytics</Footer>
    </Layout>
  );
};

export default MainLayout;
