import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
