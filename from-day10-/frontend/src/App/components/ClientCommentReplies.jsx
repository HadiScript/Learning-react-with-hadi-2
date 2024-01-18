import { Modal } from "antd";
import React from "react";

const ClientCommentReplies = ({ open, setOpen, currentComment }) => {
  // Fetch all replies with current comment id -> replies/:commentId -> setState -> store all replies that will get from api
  // call in useEffect [currentComment._id]

  // render all replies

  // useState -> comment init = ""
  // submitFunc -> api -> add-reply/:commentId

  return (
    <Modal title="Basic Modal" open={open} onCancel={() => setOpen(false)} footer={null}>
      {/* input box */}
      {/* submit */}

      {/* all replies */}
    </Modal>
  );
};

export default ClientCommentReplies;
