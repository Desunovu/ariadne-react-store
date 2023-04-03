import React, {useContext} from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

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
                    <Typography variant="h5" component="div">
                        <Link to="/" style={{textDecoration: "none", color: "white"}}>React Login</Link>
                    </Typography>
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