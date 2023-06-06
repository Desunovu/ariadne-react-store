import React, {useState} from "react";
import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import UpdateProduct from "./UpdateProduct";

function ProductMenu() {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedAction, setSelectedAction] = useState("get");

    const handleChange = (event, newAction) => {
        setSelectedProduct({});
        setSelectedAction(newAction);
    }

    return (
        <Box>
            <ToggleButtonGroup value={selectedAction}>
                <ToggleButton  value="get" onClick={handleChange}>Список товаров</ToggleButton>
                <ToggleButton  value="add" onClick={handleChange}>Добавить товар</ToggleButton>
                <ToggleButton  value="update" sx={{ pointerEvents: "none" }}>Редактировать товар</ToggleButton>
            </ToggleButtonGroup>

            {(() => {
                switch (selectedAction) {
                    case "get":
                        return <ProductList setSelectedProduct={setSelectedProduct} setSelectedAction={setSelectedAction}/>
                    case "add":
                        return <AddProduct/>
                    case "update":
                        return <UpdateProduct product={selectedProduct}/>
                    default:
                        return null
                }
            })()}
        </Box>
    )
}

export default ProductMenu;