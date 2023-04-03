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

const drawerWidth = 240;

function AdminDrawer(props) {
    const { user} = useContext(AuthContext);
    let navigate = useNavigate();

    const handleListItemClick = (
        event,
        index
    ) => {
        console.log(event)
        console.log(index)
        props.setSelectedIndex(index);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Box sx={{overflow: "auto"}}>
                <List>
                    {props.actions.map(element => (
                        <ListItem key={element.index} disablePadding>
                            <ListItemButton
                                selected={props.selectedIndex === element.index}
                                onClick={(event) => handleListItemClick(event, element.index)}
                            >
                                <ListItemText primary={element.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default AdminDrawer;