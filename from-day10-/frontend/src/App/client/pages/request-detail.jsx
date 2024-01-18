import React from "react";
import { __useSingleTicket } from "../../../logic/actions/_client-ticket";
import { useParams } from "react-router-dom";
import PanelHeading from "../../components/PanelHeading";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import ClientComments from "../../components/ClientComments";

const { useBreakpoint } = Grid;

const RequestDetail = () => {
  const { id } = useParams();

  const { loading, singleItem, doComment, comment, setComment, deleteComment } = __useSingleTicket(id);

  return (
    <>
      <PanelHeading icon={<FolderOpenOutlined className="its-icon" />} title={singleItem?.title} para={"Here is the single ticket detail"} />

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              {useBreakpoint().md && <th scope="col">Description</th>}
              <th scope="col">Priority</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{singleItem?.title}</td>
              {useBreakpoint().md && <td style={{ maxWidth: "400px" }}>{singleItem?.description}</td>}
              <td>{singleItem?.priority}</td>
              <td>{singleItem?.category?.name}</td>
              <td>{singleItem?.status}</td>
              {/* <td role="button">
                <Link to={`/_/request-detail/${x._id}`}>
                  <FolderOpenOutlined />
                </Link>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>

      <ClientComments loading={loading} doComment={doComment} comment={comment} setComment={setComment} list={singleItem?.comments} deleteComment={deleteComment} />
    </>
  );
};

export default RequestDetail;
