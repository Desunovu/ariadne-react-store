import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
} from "@mui/material";

const drawerWidth = 240;

function AdminDrawer(props) {
  const handleListItemClick = (event, index) => {
    props.setSelectedIndex(index);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {props.actions.map((element) => (
            <ListItem key={element.index} disablePadding>
              <ListItemButton
                selected={props.selectedIndex === element.index}
                onClick={(event) => handleListItemClick(event, element.index)}
              >
                <ListItemText primary={element.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default AdminDrawer;