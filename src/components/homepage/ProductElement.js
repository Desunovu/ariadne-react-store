import React from "react";
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
import {Link} from "react-router-dom";

function ProductElement(props){
    const { product } = props;

    return (
        <Grid item xs="auto" md={4}>
            <Card sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column", height: 300,}}>
                <CardActionArea component={Link} to={"/product/"+product.id} sx={{flex: "1 0 auto"}}>
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
        </Grid>
    )
}

export default ProductElement;