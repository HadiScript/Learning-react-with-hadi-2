import React from "react";
import Cover from "./components/Screens/Cover";
import { Route, Routes } from "react-router-dom";

import Accordion_ from "./components/Screens/Accordion_";
import Layout from "./components/Screens/Layout";
import Cards_ from "./components/Screens/Cards_";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Cover />} />
      <Route path="/cover" element={<Cover />} />

      <Route path="/explore" element={<Layout />}>
        <Route path="accordions" element={<Accordion_ />} />
        <Route path="cards" element={<Cards_ />} />
      </Route>

      <Route path="*" element={<p>Not Found :(</p>} />
    </Routes>
  );
};

export default App;
