import "./style/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import AppProps2 from "./AppProps2";

// import AppProps from "./components/AppProps";
// import AppUseState from "./components/AppUseState";
// import StyleApp from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<StyleApp />);
// root.render(<AppUseState />);
// root.render(<AppProps />);
root.render(
  <div className="the-father">
    <AppProps2 />
  </div>
);
