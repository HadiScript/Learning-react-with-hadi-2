import React from "react";
import Home from "./screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./screens/About";
import NotFound from "./screens/NotFound";

import "./App.css";
import MyProfile from "./screens/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/personal" element={<ProtectedRoute isAdmin={true} />}>
            <Route path="profile" element={<MyProfile />} />
            <Route path="home" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
