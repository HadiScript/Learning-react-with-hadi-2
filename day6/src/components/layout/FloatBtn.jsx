import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import React from "react";
import { FloatButton } from "antd";

const FloatBtn = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      icon={<CustomerServiceOutlined />}
    >
      <input
        style={{ width: "40px", height: "40px", border: "none", backgroundColor: "#0c4a6e", borderRadius: "50%", paddingLeft: "10px", color: "white" }}
        readOnly
        role="button"
      />
      <input
        style={{ width: "40px", height: "40px", border: "none", backgroundColor: "#0c0a09", borderRadius: "50%", paddingLeft: "10px", color: "white" }}
        className="floatInput mt-3"
        readOnly
        role="button"
      />
      <input
        style={{ width: "40px", height: "40px", border: "none", backgroundColor: "#2e1065", borderRadius: "50%", paddingLeft: "10px", color: "white" }}
        className="floatInput mt-3"
        readOnly
        role="button"
      />
    </FloatButton.Group>
  </>
);
export default FloatBtn;
