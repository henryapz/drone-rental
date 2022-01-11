import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';

function RecentActivity() {
  const selectedFiler = 10;
  /* const activities = [
    {
      userName: 'Henry A.',
      droneName: 'T800',
      dronePrice: '5000',
      time: '',
    },
  ]; */
  const activities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          action={
            <Select autoWidth value={selectedFiler}>
              <MenuItem value={10}>Últimos 7 días</MenuItem>
              <MenuItem value={12}>Mes en curso</MenuItem>
              <MenuItem value={13}>Últimos 30 días</MenuItem>
              <MenuItem value={14}>Último mes</MenuItem>
              <MenuItem value={15}>Últimos 3 meses</MenuItem>
            </Select>
          }
          title="Drone Alquilados"
        />
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {activities.map(elem => (
              <>
                <ListItem secondaryAction="1hr ago" key={elem}>
                  <ListItemText
                    primary={`Cliente ${elem} (Name Name)`}
                    secondary="$5000"
                  />
                </ListItem>
                <Divider key={`${elem * 10}`} />
              </>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecentActivity;
