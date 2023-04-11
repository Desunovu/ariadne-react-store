import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useLazyQuery, gql} from "@apollo/react-hooks";
import {TextField, Button, Container, Stack, Alert, List, Box, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AdminDrawer from "../components/admin_panel/AdminDrawer";
import GetUsersMenu from "../components/admin_panel/GetUsersMenu";
import ProductMenu from "../components/admin_panel/ProductMenu";
import CategoriesMenu from "../components/admin_panel/CategoriesMenu";

function Admin(props){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const actions  = [
        {index: 0, text: "Пользователи"},
        {index: 1, text: "Добавить товар"},
        {index: 2, text: "Категории"},
        {index: 3, text: "Характеристики"}
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
                        return <GetUsersMenu/>}
                    case 1:
                        return <ProductMenu/>
                    case 2:
                        return <CategoriesMenu/>
                    default:
                        return null
                }
            })()}
            </Box>
        </Box>
    )
}

export default Admin

