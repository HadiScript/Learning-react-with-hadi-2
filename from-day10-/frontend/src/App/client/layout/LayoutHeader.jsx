import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Grid } from "antd";
import React, { useState } from "react";
import LeftCol from "./LeftCol";

const { useBreakpoint } = Grid;

const LayoutHeader = () => {
  const breakpoints = useBreakpoint();
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  return (
    <>
      <div className="pb-2 pt-2 border-bottom d-flex flex-row justify-content-between align-items-center">
        {!breakpoints.md && <MenuOutlined onClick={() => setDrawerVisibility(true)} />}
        <span style={{ fontWeight: "600" }}>Welcome hadi</span>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ fontWeight: "600" }}>
          <span className="d-flex flex-row justify-content-center align-items-center gap-1 border-end px-1 ">
            <LogoutOutlined /> Logout
          </span>
        </div>
      </div>
      <Drawer
        placement="left"
        closable={false}
        width={250}
        onClose={() => setDrawerVisibility(false)}
        open={drawerVisibility}
        extra={<CloseOutlined onClick={() => setDrawerVisibility(false)} />}
      >
        <LeftCol />
      </Drawer>
    </>
  );
};

export default LayoutHeader;
