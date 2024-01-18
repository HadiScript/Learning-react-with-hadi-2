import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Memo/Main";
// import Main from "./useCallback/Main";
// import Main from "./useReducer/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
