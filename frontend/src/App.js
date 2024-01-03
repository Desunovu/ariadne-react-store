import "./App.css";
import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Admin from "./pages/admin";
import {Toolbar} from "@mui/material";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import {AuthContext} from "./context/authContext";
import {UserPage} from "./pages/user";
import {Favorites} from "./pages/favorites";
import {ProductPage} from "./pages/product";

function App() {
  const {userData} = useContext(AuthContext);

  return (
    <div>
      <Navbar/>
      <Toolbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {userData &&
          <>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/product">
              <Route path=":id" element={<ProductPage/>}/>
            </Route>
            <Route path="/user" element={<UserPage/>}>
              {userData.role === "Admin" && (
                <Route path=":userId" element={<UserPage userId=":userId"/>}/>
              )}
            </Route>
            {
              userData.role === "Admin" && (
                <Route path="/admin" element={<Admin/>}/>
              )
            }
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/orders" element={<Orders/>}>
              {userData.role === "Admin" && (
                <Route path=":userId" element={<Orders/>}/>
              )}
            </Route>
            <Route path="/favorites" element={<Favorites/>}/>
          </>
        }
      </Routes>
    </div>
  )

}

export default App;
