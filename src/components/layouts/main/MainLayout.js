import React from "react";
import { Divider, Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../modal/HeaderComponent";

import "./main.css";

const { Header, Content } = Layout;

function MainLayout() {
  return (
    <Layout
      style={{
        height: "100vh",
        padding: 16,
      }}
    >
      <div style={{ display: "flex" }}>
        <span style={{ fontFamily: "Pretendard-Bold", fontSize: "24px" }}>
          회원상세
        </span>
        <div
          style={{
            width: "6px",
            height: "6px",
            marginLeft: "14px",
            backgroundColor: "#FF4D4F",
            borderRadius: "6px",
            marginRight: "4px",
          }}
        ></div>
        <span
          style={{
            color: "#FF4D4F",

            fontFamily: "Pretendard-Bold",
          }}
        >
          필수항목
        </span>
      </div>

      <Divider />

      <Header
        style={{
          padding: 0,
          height: "40px",
        }}
      >
        <HeaderComponent />
      </Header>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
