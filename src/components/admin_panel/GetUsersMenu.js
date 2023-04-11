import React, {useContext, useState} from "react";
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton, Toolbar, Container, Grid
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {gql, useQuery} from "@apollo/react-hooks";
import UserElement from "./UserElement";

const GET_USERS=gql`
    query GetUsers(
        $pagination: Pagination
        $sort: SortGetUsers
    ) {
        getUsers(
           pagination: $pagination,
           sort: $sort
        ){
            status
            errors {
              code
              message
            }
            users {
              id
              email
              role
              avatarUrl
              firstName
              lastName
              address
              phoneNumber
            }
        }
    }
`

function GetUsersMenu(props) {
    const { user } = useContext(AuthContext);
    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);

    const {data} = useQuery(
        GET_USERS, {
            onCompleted: (data) => {
                console.log(data)
                setUsers(data.getUsers.users)
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md">
            <h3>Список пользователей сайта</h3>
            <Grid container spacing={5}>
                {users.map((_user) => (
                    <UserElement user={_user}/>
                ))}
            </Grid>
        </Container>
    )
}

export default GetUsersMenu;