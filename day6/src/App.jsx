import React from "react";
import Layout from "./components/layout";

import "./assets/layout.css";

const App = () => {
  return (
    <>
      <Layout>
        <div className="d-flex flex-column justify-content-start align-items-start main-db_mainHeading">
          <span>Hello World :)</span>
          <small>In publishing and graphic design, Lorem ipsum is a placeholder text commonly </small>
        </div>
      </Layout>
    </>
  );
};

export default App;
