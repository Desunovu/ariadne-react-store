import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" />
            <Route path="/register" />
        </Routes>
    </div>
  );
}

export default App;
