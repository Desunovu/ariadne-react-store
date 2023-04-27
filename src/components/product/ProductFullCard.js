import {Button, Card, CardActionArea, CardActions, CardContent, Chip, Divider, Typography} from "@mui/material";
import React from "react";

export default function ProductFullCard(props){
    const { product } = props;

    return (
        <Card sx={{display: "box", justifyContent: "flex-start", flexDirection: "column"}}>
            <CardActionArea sx={{flex: "1 0 auto"}}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" gutterBottom>
                        {product.description}
                    </Typography>
                    {product.categories.map((category) => (
                        <Chip label={category.name}/>
                    ))}
                    <Typography variant="h6" color="primary">
                        {product.price} руб.
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Осталось: {product.amount} ед.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Характеристики:
                    </Typography>
                    {product.characteristics.map((item) => (
                        <Typography variant="caption" color="textSecondary">
                            {item.characteristicName}:{item.value}<br/>
                        </Typography>
                    ))}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Добавить в корзину
                </Button>
            </CardActions>
        </Card>
    )
}
