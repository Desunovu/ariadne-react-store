import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { useQuery } from "@apollo/react-hooks";
import UserElement from "./UserElement";
import { GET_USERS } from "../../../operations/queries/getUsers";

function UsersMenu() {
  const [users, setUsers] = useState([]);

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      console.log(data);
      setUsers(data.getUsers.users);
    },
  });

  return (
    <Container spacing={2} maxWidth="md">
      <h3>Список пользователей сайта</h3>
      <Grid container spacing={5}>
        {users.map((user) => (
          <UserElement user={user} />
        ))}
      </Grid>
    </Container>
  );
}

export default UsersMenu;