import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Products from "./pages/products";
import Admin from "./pages/admin";
import {Box} from "@mui/material";

function App() {
  return (
    <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
    </div>
  );
}

export default App;
