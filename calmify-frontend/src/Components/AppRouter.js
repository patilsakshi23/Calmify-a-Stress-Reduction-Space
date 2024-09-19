import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPage from "../Pages/Inputs/AudioPage";
import VideoPage from "../Pages/Inputs/VideoPage";
import TextPage from "../Pages/TextPage";
import InputsPage from "../Pages/Inputs/InputsPage";
import HomePage from "../Pages/HomePage/HomePage";
import ExerciseOption from "../Pages/HomePage/ExerciseOption";
import YogaOption from "../Pages/HomePage/YogaOption";
import MindfulOption from "../Pages/HomePage/MindfulOption";

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
          <Route exact path="/yogaoption" element={<YogaOption/>} />
          <Route exact path="/exerciseoption" element={<ExerciseOption/>} />
          <Route exact path="/mindfuloption" element={<MindfulOption/>} />
        </Routes>
      </Router>
    </>
  );
}
