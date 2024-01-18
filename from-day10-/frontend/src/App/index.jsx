// import React from "react";
// import { _useCategories } from "../logic/actions/_categories";

// const App = () => {
//   const { loading, categories } = _useCategories();

//   return <div>Data : {loading ? "please wait..." : JSON.stringify(categories)}</div>;
// };

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./common/login";
import Home from "./common/home";
import ClientDashboard from "./client/pages/client-dashboard";
import ClientOpenTickets from "./client/pages/client-open-tickets";
import ClientRoutes from "./client/pages/ClientRoutes";
import SubmitRequest from "./client/pages/submit-request";
import ResolvedRequests from "./client/pages/resolved-requests";
import RequestDetail from "./client/pages/request-detail";
import AgentRoutes from "./agent/pages/agent-routes";
import AgentDashboard from "./agent/pages/agent-dashboard";
import Buckets from "./agent/pages/buckets";
import PickTickets from "./agent/pages/pick-tickets";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/_" element={<ClientRoutes />}>
          <Route path="stats" element={<ClientDashboard />} />
          <Route path="submit-request" element={<SubmitRequest />} />
          <Route path="open-requests" element={<ClientOpenTickets />} />
          <Route path="resolved-requests" element={<ResolvedRequests />} />
          <Route path="update-profile" element={<ClientOpenTickets />} />
          <Route path="request-detail/:id" element={<RequestDetail />} />
        </Route>

        <Route path="/agent" element={<AgentRoutes />}>
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="bucket" element={<Buckets />} />
          <Route path="picked-tickets" element={<PickTickets />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
};

export default App;
