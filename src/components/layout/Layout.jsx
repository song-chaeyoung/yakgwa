import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import BtmBar from "./BtmBar";

const LayoutContainer = styled.div`
  width: 100%;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <BtmBar />
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;
