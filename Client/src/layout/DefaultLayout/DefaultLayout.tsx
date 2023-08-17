import React, { ReactNode } from "react";
import "./DefaultLayout.css";
import RightBar from "../../components/RightBar/RightBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {DefaultLayoutProps} from '../../types/types'

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper-middle-content">
        <div className="container-middle">{children}</div>
      </div>
      <RightBar />
    </>
  );
};

export default DefaultLayout;
