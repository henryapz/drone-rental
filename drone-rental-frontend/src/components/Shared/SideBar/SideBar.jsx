import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function SideBar({ navPages, open, setOpen }) {
  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box width="250px" role="presentation">
        <List>
          {navPages.map(page => (
            <ListItem
              button
              component={Link}
              to={page.url}
              key={page.name}
              onClick={() => setOpen(false)}
            >
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
      </Box>
    </Drawer>
  );
}

SideBar.propTypes = {
  navPages: PropTypes.instanceOf(Array).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideBar;
