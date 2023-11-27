/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Header from "../pages/Shared/Header/Header";
import ChatBot from "../pages/Shared/ChatBot";

const MainLayout = () => {
  return (
    <div className="my-font-family">
      <Header></Header>
      <Outlet></Outlet>
      {/* <ChatBot></ChatBot> */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
