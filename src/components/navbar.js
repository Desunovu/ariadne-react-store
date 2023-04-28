import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { StoreTwoTone, ShoppingCartTwoTone } from "@mui/icons-material";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  console.log(localStorage.getItem("token"));
  console.log(user);

  return (
    <Box sf={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/*Заголовок магазина*/}
          <Button
            component={Link}
            to={"/"}
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StoreTwoTone />
            D3$uN0Vu STORE
          </Button>
          {/*Кнопка админ-панели*/}
          {document.location.pathname !== "/admin" && user && (
            <Button
              to="/admin"
              sx={{
                textDecoration: "none",
                color: "white",
                marginLeft: "20px",
              }}
            >
              Панель администратора
            </Button>
          )}
          {/*Кнопки пользователя, входа, выхода, регистрации*/}
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <div>
                {/*Аватарка*/}
                {/*Корзина*/}
                <Button
                  component={Link}
                  to={"/"}
                  sx={{ textDecoration: "none", color: "white" }}
                  LinkComponent={"link"}
                >
                  <ShoppingCartTwoTone />
                  Корзина
                </Button>
                {/*Кнопка выхода*/}
                <Button
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={onLogout}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Зарегистироваться
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
