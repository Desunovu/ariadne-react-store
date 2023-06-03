import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { StoreTwoTone, ShoppingCartTwoTone } from "@mui/icons-material";

const navbarButtonStyle = {
  height: "100%",
  color: "white",
};

const navbarAdminButtonStyle = {
  color: "red",
};

const userButtonsBoxStyle = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"
};

function Navbar() {
  const { userData, logout } = useContext(AuthContext);
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
            {userData ? (
              <div>
                {/*Страница пользователя*/}
                <Button
                  variant={"outlined"}
                  component={Link}
                  to="/user"
                  sx={navbarButtonStyle}
                >
                  Профиль
                  <Avatar alt={userData.id} src={userData.avatarUrl} sx={{marginLeft: "10px"}}/>
                </Button>
                {/*Кнопка админ-панели*/}
                {userData.role === "Admin" && (
                  <Button
                    variant={"outlined"}
                    component={Link}
                    to="/admin"
                    style={{ height: '100%' }}
                    sx={navbarAdminButtonStyle}
                  >
                    Панель администратора
                  </Button>
                )}
                {/*Заказы*/}
                <Button
                  variant={"outlined"}
                  sx={navbarButtonStyle}
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  Заказы
                </Button>
                {/*Корзина*/}
                <Button
                  variant={"outlined"}
                  component={Link}
                  to="/cart"
                  sx={navbarButtonStyle}
                  LinkComponent={"link"}
                >
                  <ShoppingCartTwoTone />
                  Корзина
                </Button>
                {/*Кнопка выхода*/}
                <Button
                  variant={"outlined"}
                  sx={navbarButtonStyle}
                  onClick={onLogout}
                >
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
