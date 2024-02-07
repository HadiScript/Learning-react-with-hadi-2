import Heading from "../../../components/common/Heading";
import React from "react";
import { Compass } from "react-feather";

const Dashboard = () => {
  return (
    <>
      <Heading title={"Dashboard"} icon={<Compass size={50} className="heading" />} />
    </>
  );
};

export default Dashboard;
