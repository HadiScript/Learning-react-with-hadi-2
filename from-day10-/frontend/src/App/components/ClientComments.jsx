import { Avatar, Button, Divider, Input, List } from "antd";
import React, { useState } from "react";
import { _useAuth } from "../../logic/context/AuthContext";
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ClientCommentReplies from "./ClientCommentReplies";

const ClientComments = ({ loading, doComment, comment, setComment, list, deleteComment }) => {
  const [auth] = _useAuth();

  const [open, setOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  return (
    <>
      <div className="mt-5" style={{ border: "1px solid #dee2e6", padding: "20px", borderRadius: "10px" }}>
        <div className="row mt-5">
          <div className="col-md-11">
            <Input.TextArea
              style={{
                backgroundColor: "transparent",
                color: "black",
                fontWeight: "600",
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="col-md-1 mt-2">
            <Button loading={loading} className="myBtn" onClick={doComment}>
              Submit
            </Button>
          </div>
        </div>

        <div className="mt-5 ">
          <b>All Comments</b>
        </div>
        <Divider />

        <List
          className=""
          itemLayout="vertical"
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item
              className="my-3"
              actions={[
                <div key={"client-comments"} className="mb-3 d-flex justify-content-start align-items-center gap-3">
                  <CommentOutlined
                    onClick={() => {
                      setOpen(true);
                      setCurrentComment(item);
                    }}
                  />
                  <span className="text-danger">{item.createdBy === auth?.user?._id && <DeleteOutlined onClick={() => deleteComment(item._id)} />}</span>
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<a className="text-dark">{item.createdBy}</a>}
                // title={<a className="text-dark">{item.createdBy.name}</a>}
                description={[<span className="text-secondary">{item.content}</span>]}
              />
            </List.Item>
          )}
        />
      </div>

      <ClientCommentReplies open={open} setOpen={setOpen} currentComment={currentComment} />
    </>
  );
};

export default ClientComments;
