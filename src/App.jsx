import "./App.css";
import { Home } from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";
import { Faqs } from "./components/Faqs";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/player/:name/:id" element={<VideoPlayer />} />
          <Route path="/FAQs" element={<Faqs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
