import React, { useEffect } from "react";
import { __useGetList, __useReopenTc } from "../../../logic/actions/_client-ticket";
import PanelHeading from "../../components/common/PanelHeading";
import { CheckOutlined, FolderOpenOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Tag } from "antd";
import SmallItems from "../../components/common/SmallItems";
import { useReq } from "../../../logic/hook/useReq";

const ResolvedBy = (x) => {
  return x.createdBy === x.resolvedBy ? "Me" : x.ResolvedBy;
};

const ResolvedRequests = () => {
  const { loading, list } = __useGetList("ticket/resolved-tickets");
  const { loading: reopenLoading, toReopenTc } = __useReopenTc();

  // const { loading: reopenLoading, makeReq } = useReq();

  // const toReopenTc = (id) => {
  //   const res = makeReq(put, `ticket/reopen-ticket/${id}`);
  // };


  // useEffect(()=>{
  //   makeReq(get, `ticket/my-opn`)
  // }, [])

  return (
    <>
      <PanelHeading title={loading ? <LoadingOutlined /> : "Resolved Tickets"} icon={<CheckOutlined className="its-icon" />} />

      <div className="d-flex flex-column justify-content-start gap-3">
        {list.map((x) => (
          <Card key={x._id} hoverable>
            <div className="d-flex  justify-content-between align-items-center ">
              <h5>{x.title}</h5>
              <Tag color="green">{x.resolvedAt.slice(0, 10)}</Tag>
            </div>

            <p style={{ maxWidth: "90%" }}>{x.description}</p>

            <div className="mt-3">
              <SmallItems title={"Category"} content={x.category} />
              <SmallItems title={"Resolved By"} content={ResolvedBy(x)} />
              <SmallItems title={"Comments"} content={123} />
            </div>

            <div className="mt-3 pt-3 border-top">
              <Button onClick={() => toReopenTc(x._id)} loading={reopenLoading} icon={<FolderOpenOutlined />} className="myBtn">
                Claim to reopen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ResolvedRequests;
