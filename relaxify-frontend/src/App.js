import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import OptionsPage from './components/OptionsPage';
import VideoOptionsPage from './components/VideoOptionsPage'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/video-options" element={<VideoOptionsPage />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
