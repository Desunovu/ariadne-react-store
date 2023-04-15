import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Item, Typography} from "@mui/material";

function UserElement(props){
    const { user } = props;
    console.log(user.avatarUrl)

    return (
        <Grid item xs="auto" md={4}>
            <Card sx={{minWidth: 50}}>
                <CardActionArea>
                    {user.avatarUrl &&
                    <CardMedia
                        component="img"
                        alt="Avatar not found"
                        height={60}
                        image={user.avatarUrl}
                    />
                    }
                    <CardContent>
                        <Typography variant="body">
                            {user.firstName} {user.lastName}<br/>
                            <b>ID:</b> {user.id}<br/>
                            <b>E-mail</b>: {user.email}<br/>
                            <b>Роль</b>: {user.role}<br/>
                            <b>Адрес</b>: {user.address}<br/>
                            <b>Номер телефона</b>: {user.phoneNumber}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Удалить пользователя
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default UserElement;