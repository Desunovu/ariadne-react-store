import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { StoreTwoTone, ShoppingCartTwoTone } from "@mui/icons-material";

const navbarButtonStyle = {
  color: "white",
};

const navbarAdminButtonStyle = {
  color: "red",
  marginLeft: "20px",
};

const userButtonsBoxStyle = {
  flexGrow: 1,
  textAlign: "right",
};

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sf={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/*Заголовок магазина*/}
          <Button component={Link} to={"/"} sx={navbarButtonStyle}>
            <StoreTwoTone />
            D3$uN0Vu STORE
          </Button>
          {/*Кнопки пользователя, входа, выхода, регистрации*/}
          <Box alignItems="right" sx={userButtonsBoxStyle}>
            {user ? (
              <div>
                {/*Кнопка админ-панели*/}
                {document.location.pathname !== "/admin" && user && (
                  <Button
                    component={Link}
                    to="/admin"
                    sx={navbarAdminButtonStyle}
                  >
                    Панель администратора
                  </Button>
                )}
                {/*Аватарка*/}
                {/*Заказы*/}
                <Button sx={navbarButtonStyle} onClick={() => {navigate("/orders")}}>
                  Заказы
                </Button>
                {/*Корзина*/}
                <Button
                  component={Link}
                  to="/cart"
                  sx={navbarButtonStyle}
                  LinkComponent={"link"}
                >
                  <ShoppingCartTwoTone />
                  Корзина
                </Button>
                {/*Кнопка выхода*/}
                <Button sx={navbarButtonStyle} onClick={onLogout}>
                  Выйти
                </Button>
              </div>
            ) : (
              <div>
                <Button component={Link} to="/login" sx={navbarButtonStyle}>
                  Войти
                </Button>
                <Button component={Link} to="/register" sx={navbarButtonStyle}>
                  Зарегистироваться
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
