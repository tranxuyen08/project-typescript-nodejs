import React from "react";
import { Images } from "../../assets/image";

const NotFound: React.FC = () => {
  return (
    <img
      src={Images.NotFound}
      style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
      alt="Not Found"
    />
  );
};

export default NotFound;
