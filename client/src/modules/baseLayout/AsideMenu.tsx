import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { menu } from "../router/menu.ts";
import React from "react";
import { AppLink } from "@/atoms";

const drawerWidth = 300;
export const AsideMenu = () => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menu.map(({ title, to, Icon }) => {
            const isActive = location.pathname === to;
            return (
              <React.Fragment key={title + to}>
                <ListItem disablePadding>
                  <AppLink
                    bgcolor={isActive ? "rgba(0,0,0,.05)" : "transparent"}
                    width="100%"
                    underline="none"
                    color="inherit"
                    to={to}
                  >
                    <ListItemButton role="div">
                      <ListItemIcon
                        color={
                          location.pathname === to
                            ? "rgba(0,0,0,.05)"
                            : "transparent"
                        }
                      >
                        <Icon color={isActive ? "primary" : "inherit"} />
                      </ListItemIcon>
                      <ListItemText>{title}</ListItemText>
                    </ListItemButton>
                  </AppLink>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
