import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_PRODUCT} from "../operations/queries/getProduct";
import {useParams} from "react-router-dom";
import ProductFullCard from "../components/product/ProductFullCard";

function ProductPage(){
    const params = useParams();
    const prodId = parseInt(params.id);

    const { loading, data } = useQuery(
        GET_PRODUCT, {
            variables: {
                id: prodId
            }
        }
    )

    if (loading) { return(
        <>Loading</>
    ) }

    return(
        <ProductFullCard product={data.getProduct.product}/>
    )

}

export default ProductPage;