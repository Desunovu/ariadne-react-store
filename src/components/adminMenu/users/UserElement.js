import React, { useCallback } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardActionsStyle = {
  display: "flex",
  flexDirection: "column",
};

function UserElement(props) {
  const { user } = props;
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    return navigate("/orders/" + user.id);
  }, [navigate, user.id]);

  return (
    <Grid item xs="auto" md={4}>
      <Card sx={{ minWidth: 50 }}>
        <CardActionArea>
          {user.avatarUrl && (
            <CardMedia
              component="img"
              alt="Avatar not found"
              height={60}
              image={user.avatarUrl}
            />
          )}
          <CardContent>
            <Typography variant="body">
              {user.firstName} {user.lastName}
              <br />
              <b>ID:</b> {user.id}
              <br />
              <b>E-mail</b>: {user.email}
              <br />
              <b>Роль</b>: {user.role}
              <br />
              <b>Адрес</b>: {user.address}
              <br />
              <b>Номер телефона</b>: {user.phoneNumber}
            </Typography>
          </CardContent>
        </CardActionArea>
        {document.location.pathname === "/admin" && (
          <CardActions sx={CardActionsStyle}>
            <Button size="small" color="primary">
              Удалить пользователя
            </Button>
            <Button onClick={onButtonClick}>Посмотреть заказы</Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default UserElement;
