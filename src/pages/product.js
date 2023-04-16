import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Typography
} from "@mui/material";
import {useQuery} from "@apollo/react-hooks";
import {GET_PRODUCT} from "../operations/queries/getProduct";
import {useParams} from "react-router-dom";

function ProductPage(){
    const [product, setProduct] = useState();
    const params = useParams();
    const prodId = parseInt(params.id);

    useQuery(
        GET_PRODUCT, {
            variables: {
                id: prodId
            },
            onCompleted: (data) => {
                console.log(data)
                setProduct(data.getProduct.product)
            }
        }
    )

    return (
        <Grid item xs="auto" md={4}>
            {product ?
                <Card sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column", height: 300,}}>
                    <CardActionArea sx={{flex: "1 0 auto"}}>
                        <CardContent sx={{position: "absolute", top: 0}}>
                            <Typography variant="h5">{product.name}</Typography>
                            <b>Количество:</b> {product.amount}<br/>
                            <b>Стоимость:</b> {product.price} ₽<br/>
                            <b>Описание:</b> {product.description}<br/>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {product.categories.map((category) => (
                                    <Chip label={category.name}/>
                                ))}
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Добавить в корзину
                        </Button>
                    </CardActions>
                </Card>
            :
                <>
                <Typography variant="h1">LOL</Typography>
                </>
            }
        </Grid>
    )
}

export default ProductPage;