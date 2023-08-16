import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join/Join";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
