import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_PRODUCT} from "../operations/queries/getProduct";
import {useParams} from "react-router-dom";
import ProductFullCard from "../components/ProductFullCard";
import ErrorsHandler from "../components/ErrorsHandler";
import {Container} from "@mui/material";

export function ProductPage() {
  const params = useParams();
  const prodId = parseInt(params.id);
  const [product, setProduct] = useState(undefined);
  const [errors, setErrors] = useState([]);

  const {error, loading} = useQuery(
    GET_PRODUCT, {
      variables: {
        id: prodId
      },
      onCompleted: (data) => {
        setErrors(data.getProduct.errors)
        if (data.getProduct.status) setProduct(data.getProduct.product)
      }
    }
  )

  if (loading) {
    return <>Loading</>;
  }

  return (
    <Container spacing={2} maxWidth={"lg"} sx={{mb: 2}}>
      <ErrorsHandler errors={errors} apolloError={error}/>
      {product && <ProductFullCard product={product} />}
    </Container>
  );

}