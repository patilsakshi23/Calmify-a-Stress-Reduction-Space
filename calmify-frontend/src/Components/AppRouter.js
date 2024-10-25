import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPage from "../Pages/Inputs/AudioPage";
import VideoPage from "../Pages/Inputs/VideoPage";
import TextPage from "../Pages/Inputs/TextPage";
import InputsPage from "../Pages/Inputs/InputsPage";
import HomePage from "../Pages/HomePage/HomePage";
import ExerciseOption from "../Pages/HomePage/ExerciseOption";
import YogaOption from "../Pages/HomePage/YogaOption";
import MindfulOption from "../Pages/HomePage/MindfulOption";
import LoginPage from "../Pages/Authentication/LoginPage";
import SignupPage from "../Pages/Authentication/SigupPage";
import { useAuth } from "../Pages/Authentication/AuthContext";
import QuizPage from "../Pages/Inputs/QuizPage";


export default function AppRouter() {
  const { user, setUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route path="/audio" element={<AudioPage setUser={setUser} />} />
        <Route path="/video" element={<VideoPage setUser={setUser} />} />
        <Route path="/text" element={<TextPage setUser={setUser} />} />
        <Route path="/quiz" element={<QuizPage setUser={setUser} />} />
        {/* 
        <Route path="/audio" element={user ? <AudioPage /> : <LoginPage setUser={setUser} />} />
        <Route path="/video" element={user ? <VideoPage /> : <LoginPage setUser={setUser} />} />
        <Route path="/text" element={user ? <TextPage /> : <LoginPage setUser={setUser} />} />
        <Route path="/quiz" element={user ? <QuizPage /> : <LoginPage setUser={setUser} />} /> */}

        <Route path="/input" element={user ? <InputsPage user={user} /> : <LoginPage setUser={setUser} />} />
        <Route path="/yogaoption" element={<YogaOption />} />
        <Route path="/exerciseoption" element={<ExerciseOption />} />
        <Route path="/mindfuloption" element={<MindfulOption />} />
      </Routes>
    </Router>
  );
}
