import { AppstoreOutlined, BackwardOutlined, CommentOutlined, FolderOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";

const LeftSidebar = ({ title = true }) => {
  return (
    <>
      {title && (
        <div className={"text-start px-4 mt-3"}>
          <h4>HadiScript</h4>
        </div>
      )}
      <div className="px-3 py-1 ">
        <Menu>
          <Menu.Item key="1" className="mt-3 db_active" icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" className="mt-1" icon={<FolderOutlined />}>
            Folders
          </Menu.Item>
          <Menu.Item key="3" className="mt-1" icon={<CommentOutlined />}>
            Comments
          </Menu.Item>
          <Menu.Item key="4" className="mt-4" icon={<BackwardOutlined />}>
            <span> Back</span>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default LeftSidebar;
