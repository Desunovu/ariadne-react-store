import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useLazyQuery, gql} from "@apollo/react-hooks";
import {TextField, Button, Container, Stack, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

const GET_PRODUCTS=gql`
    query GetProducts(
        $pagination: Pagination
        $sort: SortGetProducts
    ) {
        getProducts(
           pagination: $pagination,
           sort: $sort
        ){
            status
            errors{message}
            products{
                id
                name
                price
                amount
                description
                categories{name}
                images{url}
                reviews{text}
                characteristics{characteristicName, value}
            }
        }
    }    
`

function Products(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState([]);

    const pagination = {"offset": 0, "limit": 10};
    const sort = {"field": "price", "order": "ASC"};
    const [getProducts, {}] = useLazyQuery(
        GET_PRODUCTS, {
            onCompleted: (data) => {
                console.log(data.getProducts)
            }
        }
    )

    function getProductsCallback(){
        getProducts();
        console.log("Колбек вызова товаров")
    }



    return(
        <div>
            <Button onClick={getProductsCallback}>получить товары</Button>
        </div>
    )
}

export default Products;