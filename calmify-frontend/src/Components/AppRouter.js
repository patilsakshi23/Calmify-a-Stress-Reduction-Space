import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPage from "../Pages/AudioPage";
import VideoPage from "../Pages/VideoPage";
import HomePage from "../Pages/HomePage";
import TextPage from "../Pages/TextPage";
import InputsPage from "../Pages/InputsPage";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/audio" element={<AudioPage/>} />
          <Route exact path="/video" element={<VideoPage/>} />
          <Route exact path="/text" element={<TextPage/>} />
          <Route exact path="/input" element={<InputsPage/>} />
        </Routes>
      </Router>
    </>
  );
}
