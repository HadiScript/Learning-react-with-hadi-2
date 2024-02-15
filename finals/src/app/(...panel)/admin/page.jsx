import Heading from "@/components/common/Heading";
import AgentSummary from "@/components/ticket/agent-summary";
import TicketCountByCategory from "@/components/ticket/ticket-count-by-category";
import TicketSummary from "@/components/ticket/ticket-summary";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { BarChart, BarChart2, Briefcase, Cast } from "react-feather";


const BoxHeading = ({ heading, icon }) => {
  return <div className="d-flex align-items-center gap-2 mb-3"> {icon} <b className="">{heading}</b></div>
}


const constantHeight = { height: "400px" }

const AdminDashboard = () => {
  return <>
    <Heading title={"Dashboard"} icon={<Cast size={50} className="heading" />} />

    <div className="row">
      <div className="col-md-6 col-xs-12 p-2" style={{ ...constantHeight, }}>
        <div className="border border-secondary rounded p-2" style={{ height: "100%" }}>
          <BoxHeading heading={"Ticket Count By Category"} icon={<BarChart />} />
          <TicketCountByCategory />
        </div>
      </div>



      <div className="col-md-3 col-xs-12 p-2" style={{ ...constantHeight, }} >
        <div className="border border-secondary rounded p-2" style={{ height: "100%" }}>
          <BoxHeading heading={"Ticket Summary"} icon={<Briefcase />} />
          <TicketSummary />
        </div>
      </div>

      <div className="col-md-3 col-xs-12 p-2" style={{ ...constantHeight, }} >
        <div className="border border-secondary rounded p-2" style={{ height: "100%" }}>
          <BoxHeading heading={"Agent's picked, resolved tickets"} icon={<Briefcase />} />
          <AgentSummary />
        </div>
      </div>
    </div>

  </>;
};

export default AdminDashboard;
