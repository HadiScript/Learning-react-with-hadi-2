import { useParams } from "react-router-dom";
import { FolderOpenOutlined, LoadingOutlined, MinusCircleOutlined } from "@ant-design/icons";

import PanelHeading from "../../components/common/PanelHeading";
import { __useSingleTicket } from "../../../logic/actions/_client-ticket";
import TcDetailHead from "../../components/common/TcDetailHead";
import CommentsSection from "../../components/common/CommentsSection";
import { Button } from "antd";

const RequestDetail = ({}) => {
  const { id } = useParams();

  const { loading, singleItem, doComment, comment, setComment, deleteComment, closeTicket } = __useSingleTicket(id);

  return (
    <>
      <PanelHeading icon={<FolderOpenOutlined className="its-icon" />} title={loading ? <LoadingOutlined /> : singleItem?.title} para={"Here is the single ticket detail"} />
      <div className="p-3 mb-5 text-end">
        <Button onClick={closeTicket} className="myBtn" icon={<MinusCircleOutlined />}>
          Close Ticket
        </Button>
      </div>

      <TcDetailHead singleItem={singleItem} />
      <CommentsSection loading={loading} doComment={doComment} comment={comment} setComment={setComment} list={singleItem?.comments} deleteComment={deleteComment} />
    </>
  );
};

export default RequestDetail;
