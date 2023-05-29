import React, { useCallback } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

export function UserFullCard({ user, setSelectedAction }) {
  const onEditButtonClick = useCallback(
    () => {
      setSelectedAction("edit");
    },
    [setSelectedAction]
  );

  return (
    <Box>
      {user && (
        <Container spacing={2} maxWidth="sm">
          <Typography variant="h4">Информация о пользователе</Typography>
          <Typography variant="body1">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Address: {user.address}</Typography>
          <Typography variant="body1">
            Phone Number: {user.phoneNumber}
          </Typography>
          <Button variant="contained" onClick={onEditButtonClick}>Редактировать информацию</Button>
        </Container>
      )}
    </Box>
  );
}
