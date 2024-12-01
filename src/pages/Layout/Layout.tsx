import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

const drawerWidth = 240;

export const Layout = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Записаться на маникюр
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        // onOpen={() => setIsOpen(true)}
        sx={{ flexShrink: 0, [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' } }}
      >
        <Typography>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => console.log('Alala')}>
            <List>
              <ListItem button>
                <ListItemText primary="Главная" />
              </ListItem>
            </List>
          </Box>
        </Typography>
      </Drawer>
    </Box>
  );
};
