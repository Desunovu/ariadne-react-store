import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Admin from "./pages/admin";
import ProductPage from "./pages/product";
import {Toolbar} from "@mui/material";

function App() {
  return (
    <div>
            <Navbar/>
            <Toolbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/product">
                    <Route path=":id" element={<ProductPage/>}/>
                </Route>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
    </div>
  );
}

export default App;
