import { BackwardOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Grid } from "antd";
import React, { useState } from "react";
import LeftSidebar from "./leftSidebar";

// import {Gird} from

const LayoutHeader = () => {
  const points = Grid.useBreakpoint();

  const [showLeft, setShowLeft] = useState(false);

  return (
    <>
      <div className="py-2 border-bottom d-flex flex-row justify-content-between align-items-center _dg-primary ">
        {!points.md && <MenuOutlined onClick={() => setShowLeft(true)} />}
        <span>Welcome hadi raza</span>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <span className="border-end"> Update</span>
          {!points.md && <span> Assets</span>}
        </div>
      </div>

      <Drawer style={{ width: "250px" }} title="Basic Drawer" placement="left" onClose={() => setShowLeft(false)} open={showLeft}>
        <LeftSidebar title={false} />
      </Drawer>
    </>
  );
};

export default LayoutHeader;
