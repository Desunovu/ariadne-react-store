import React from "react";
import {useState} from "react";
import {Box, Toolbar} from "@mui/material";
import AdminDrawer from "../components/admin_panel/AdminDrawer";
import UsersMenu from "../components/admin_panel/users/UsersMenu";
import AddProductMenu from "../components/admin_panel/add_product/AddProductMenu";
import CategoriesMenu from "../components/admin_panel/categories/CategoriesMenu";
import CharacteristicMenu from "../components/admin_panel/characteristics/CharacteristicMenu";

function Admin(){
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
            {(() => {
                switch (selectedIndex) {
                    case 0:{
                        return <UsersMenu/>}
                    case 1:
                        return <AddProductMenu/>
                    case 2:
                        return <CategoriesMenu/>
                    case 3:
                        return <CharacteristicMenu/>
                    default:
                        return null
                }
            })()}
            </Box>
        </Box>
    )
}

export default Admin

