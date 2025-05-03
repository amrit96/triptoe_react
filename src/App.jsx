import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/index";
import "./App.css"; // Optional: style your page

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <Link to="/">Home</Link> | <Link to="/map">Map</Link> | <Link to="/list">List</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/map" element={<Map />} /> */}
          {/* <Route path="/list" element={<List />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
