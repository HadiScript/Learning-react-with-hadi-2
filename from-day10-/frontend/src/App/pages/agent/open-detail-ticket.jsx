import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAvailableAgents, useSingleTicket } from "../../../logic/actions/_agent";
import { FolderOpenOutlined, LoadingOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import PanelHeading from "../../components/common/PanelHeading";
import TcDetailHead from "../../components/common/TcDetailHead";
import CommentsSection from "../../components/common/CommentsSection";
import { _useAuth } from "../../../logic/context/AuthContext";

const OpenDetailTicket = () => {
  const { id } = useParams();
  const path = useLocation().pathname;

  const [auth] = _useAuth();

  const [handoverModel, setHandoverModel] = useState(false);

  const [openEscModal, setOpenEscModal] = useState(false);
  const [why, setWhy] = useState("");

  const { loading: usersLoading, list: usersList, handoverTc } = useAvailableAgents(handoverModel);
  const { loading, ticket: singleItem, EscTicket, closeTicket } = useSingleTicket(id);

  const AlertEsc = () => {
    let ok = window?.confirm("Are you sure?");
    if (ok) {
      setOpenEscModal(true);
    }
  };

  return (
    <>
      <PanelHeading icon={<FolderOpenOutlined className="its-icon" />} title={loading ? <LoadingOutlined /> : singleItem?.title} />

      <div className="d-flex justify-content-end gap-2 mb-5">
        <Button onClick={closeTicket} className="myBtn" icon={<MinusCircleOutlined />}>
          Close Ticket
        </Button>

        <Button onClick={AlertEsc} className="myBtn">
          Escalate Ticket
        </Button>
        {!path.includes("handover") && (
          <Button className="myBtn" onClick={() => setHandoverModel(true)}>
            Handover Ticket
          </Button>
        )}
      </div>

      <TcDetailHead singleItem={singleItem} />

      <Modal centered width={700} title={singleItem?.title} open={openEscModal} onCancel={() => setOpenEscModal(false)} footer={null}>
        <div className="mt-4">
          <Input.TextArea value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Please write the reason, why you are escalating this ticket?" />

          <Button className="myBtn mt-2" onClick={() => EscTicket(id, why)}>
            Escalate to manager
          </Button>
        </div>
      </Modal>

      <Modal centered width={700} title={loading ? "..." : "Available Users"} open={handoverModel} onCancel={() => setHandoverModel(false)} footer={null}>
        <div className="mt-4">
          {usersList
            ?.filter((x) => x._id !== auth?.user?._id)
            .map((x) => (
              <div key={x._id} className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column justify-content-start align-items-start ">
                  <b>{x.name}</b>
                  <small>{x.email}</small>
                </div>
                <Button className="myBtn" onClick={() => handoverTc(id, x._id)}>
                  Handover
                </Button>
              </div>
            ))}
        </div>
      </Modal>

      {/* <CommentsSection /> */}
    </>
  );
};

export default OpenDetailTicket;
