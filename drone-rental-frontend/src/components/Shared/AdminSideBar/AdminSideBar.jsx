import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navPages = [
  { name: 'Dashboard', url: '/' },
  { name: 'Drones', url: '/droneslist' },
  { name: 'Pedidos', url: '/faqs' },
];

function AdminSideBar() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navPages.map(page => (
            <ListItem button component={Link} to={page.url} key={page.name}>
              <ListItemText
                primary={page.name}
                primaryTypographyProps={{
                  color: 'primary.dark',
                  fontWeight: 'medium',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default AdminSideBar;
