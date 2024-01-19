import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleTicket } from "../../../logic/actions/_agent";
import PanelHeading from "../../components/PanelHeading";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";

const OpenDetailTicket = () => {
  const { id } = useParams();

  const [openEscModal, setOpenEscModal] = useState(false);
  const [why, setWhy] = useState("");

  const { loading, ticket: singleItem, EscTicket } = useSingleTicket(id);

  const AlertEsc = () => {
    let ok = window?.confirm("Are you sure?");
    if (ok) {
      setOpenEscModal(true);
    }
  };

  return (
    <>
      <PanelHeading icon={<FolderOpenOutlined className="its-icon" />} title={singleItem?.title} />

      <div className="d-flex justify-content-end gap-2">
        <Button onClick={AlertEsc} className="myBtn">
          Escalate Ticket
        </Button>
        <Button className="myBtn">Handover Ticket</Button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              {/* {useBreakpoint().md && <th scope="col">Description</th>} */}
              <th scope="col">Priority</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{singleItem?.title}</td>
              {/* {useBreakpoint().md && <td style={{ maxWidth: "400px" }}>{singleItem?.description}</td>} */}
              <td>{singleItem?.priority}</td>
              <td>{singleItem?.category?.name}</td>
              <td>{singleItem?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal centered width={700} title={singleItem?.title} open={openEscModal} onCancel={() => setOpenEscModal(false)} footer={null}>
        <div className="mt-4">
          <Input.TextArea value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Please write the reason, why you are escalating this ticket?" />

          <Button className="myBtn mt-2" onClick={() => EscTicket(id, why)}>
            Escalate to manager
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OpenDetailTicket;
