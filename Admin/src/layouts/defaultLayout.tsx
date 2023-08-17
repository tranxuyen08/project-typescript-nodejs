import React, { ReactNode } from "react";
import SideBarAdmin from "../components/SideBarAdmin/SideBarAdmin";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <SideBarAdmin />
      {children}
    </>
  );
};

export default DefaultLayout;
