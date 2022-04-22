import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function RecentActivity({ droneOrders }) {
  function parseDate(date) {
    return new Date(date).toLocaleString();
  }
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Drones Alquilados Recientemente" />
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {droneOrders.map(elem => (
              <React.Fragment key={elem.itemId}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${elem.model} — ${elem.brand}`}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {parseDate(elem.createdAt)}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

RecentActivity.propTypes = {
  droneOrders: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string,
      model: PropTypes.string,
      createdAt: PropTypes.string,
      itemId: PropTypes.string,
      _id: PropTypes.string,
    }),
  ),
};
RecentActivity.defaultProps = {
  droneOrders: [],
};

export default RecentActivity;
