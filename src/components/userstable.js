import React, {useContext, useState} from "react";
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton, Toolbar
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import {gql, useQuery} from "@apollo/react-hooks";

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
            errors{message}
            users{id, email, role, firstName, lastName}
        }
    }
`

function UsersTable(props) {
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
        <div>
            <Box>
                <h3> СПИСОК ПОЛЬЗОВАТЕЛЕЙ </h3>
                <List>
                    {users.map(user => (
                        <ListItem
                            key={user.id}

                        >
                            {user.email}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    )
}

export default UsersTable;