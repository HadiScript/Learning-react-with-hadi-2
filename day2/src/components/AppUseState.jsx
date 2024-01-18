// class base compon
// functional compo

import React, { useState } from "react";

const AppUseState = () => {
  const [firstName, updateFirstName] = useState("hadier raza");
  const [count, setCount] = useState(0);

  const myClicks = () => {
    updateFirstName("abass ali mustogoi");
  };

  return (
    <div>
      App {firstName}
      <hr />
      <button onClick={myClicks}>Change the name</button>
      <hr />
      {count}
      <button onClick={() => setCount(count + 1)}>Change the name</button>
    </div>
  );
};

export default AppUseState;
