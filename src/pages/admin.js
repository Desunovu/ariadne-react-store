import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useLazyQuery, gql} from "@apollo/react-hooks";
import {TextField, Button, Container, Stack, Alert, List, Box, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AdminDrawer from "../components/admindrawer";
import UsersTable from "../components/userstable";

function Admin(props){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const actions  = [
        {index: 0, action: "getUsers", text: "Пользователи"},
        {index: 1, action: "addProduct", text: "Добавить товар"},
    ]

    return (
        <Box sx={{display: "flex"}}>
            <AdminDrawer
                actions={actions}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar/>
            {(() => {
                switch (selectedIndex) {
                    case 0:{
                        console.log("Рендер пользователей")
                        return <UsersTable/>}
                    case 1:
                        return <TextField/>
                    default:
                        return null
                }
            })()}
            </Box>
        </Box>
    )
}

export default Admin

