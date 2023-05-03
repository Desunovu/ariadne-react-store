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
import Cart from "./pages/cart";
import Orders from "./pages/orders";

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
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Routes>
    </div>
  );
}

export default App;
