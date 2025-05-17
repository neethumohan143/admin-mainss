import React from "react";
import Dashbord from "../page/Dashbord";
import { useSelector } from "react-redux";
import WelcomPage from "../components/WelcomePage";

const SpecialComponent = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  return <>{isAdminExist ?<Dashbord /> : <WelcomPage />  }</>;
};

export default SpecialComponent;
