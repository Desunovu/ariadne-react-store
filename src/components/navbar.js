import React, {useContext} from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    }

    console.log(localStorage.getItem("token"));
    console.log(user);

    return (
        <Box sf={{display: "flex"}}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer +  1}}
            >
                <Toolbar>
                    {/*Заголовок магазина*/}
                    <Typography variant="h5" component="div" sx={{display: "flex", alignItems: "center"}}>
                        <StoreTwoToneIcon/>
                        <Link to="/" style={{textDecoration: "none", color: "white"}}>D3$uN0Vu STORE</Link>
                    </Typography>
                    {/*Кнопка админ-панели*/}
                    {document.location.pathname !== "/admin" &&
                        <Typography variant="body" component="div">
                            <Link to="/admin" style={{textDecoration: "none", color: "white", marginLeft: "20px"}}>
                                Панель администратора
                            </Link>
                        </Typography>
                    }
                    {/*Кнопки пользователя, входа, выхода, регистрации*/}
                    <Box alignItems="right" sx={{flexGrow: 1, textAlign: "right"}}>
                        { user ?
                            <div>
                                <Button style={{textDecoration: "none", color: "white"}} onClick={onLogout}>Выйти</Button>
                            </div>
                            :
                            <div>
                                <Link to="/login" style={{textDecoration: "none", color: "white", marginRight: "10px"}}>Войти</Link>
                                <Link to="/register" style={{textDecoration: "none", color: "white"}}>Зарегистироваться</Link>
                            </div>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;