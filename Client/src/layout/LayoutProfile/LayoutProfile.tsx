import React from "react";
import SideBar from '../../components/Sidebar/Sidebar'
import { LayoutProfileProps } from "../../types/types";


const LayoutProfile: React.FC<LayoutProfileProps> = ({ children }) => {
  return (
    <>
      <SideBar/>
      {children}
    </>
  );
};

export default LayoutProfile;
