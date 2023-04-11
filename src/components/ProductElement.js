import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Item, Typography} from "@mui/material";

function ProductElement(props){
    const { product } = props;

    return (
        <Grid item xs="auto" md={4}>
            <Card sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column", height: 300,}}>
                <CardActionArea sx={{flex: "1 0 auto"}}>
                    <CardContent sx={{position: "absolute", top: 0}}>
                        <Typography variant="body">
                            <b>ID:</b> {product.id}<br/>
                            <b>Название:</b> {product.name}<br/>
                            <b>Количество:</b> {product.amount}<br/>
                            <b>Стоимость:</b> {product.price} ₽<br/>
                            <b>Описание:</b> {product.description}<br/>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Добавить в корзину
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductElement;