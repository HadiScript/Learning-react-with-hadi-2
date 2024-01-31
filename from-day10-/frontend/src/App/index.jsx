import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/home";
import Login from "./pages/common/login";

import { ClientRoutes, SubmitRequest, ClientRequestDetail, ClientOpenTickets, ResolvedRequests } from "./pages/client";
import { AgentRoutes, Buckets } from "./pages/agent";
import PickTickets from "./pages/agent/pick-tickets";
import OpenDetailTicket from "./pages/agent/open-detail-ticket";
import HandoverTc from "./pages/agent/handoverTc";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/_" element={<ClientRoutes />}>
          <Route path="submit-request" element={<SubmitRequest />} />
          <Route path="open-requests" element={<ClientOpenTickets />} />
          <Route path="request-detail/:id" element={<ClientRequestDetail />} />
          <Route path="resolved-requests" element={<ResolvedRequests />} />
        </Route>

        <Route path="/agent" element={<AgentRoutes />}>
          {/* <Route path="dashboard" element={<AgentDashboard />} /> */}
          <Route path="bucket" element={<Buckets />} />
          <Route path="picked-tickets" element={<PickTickets />} />
          <Route path="detail/:id" element={<OpenDetailTicket />} />
          <Route path="handover-to-me" element={<HandoverTc />} />
          <Route path="handover/detail/:id" element={<OpenDetailTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
