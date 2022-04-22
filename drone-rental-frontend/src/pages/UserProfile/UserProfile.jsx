import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import UserProfileForm from '../../components/UserProfile/UserProfileForm/UserProfileForm';
import UserOrdersTable from '../../components/Shared/Orders/UserOrdersTable';

function UserProfile() {
  const [value, setValue] = React.useState(0);
  const user = useSelector(state => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Perfil" />
        <Tab label="Mis Órdenes" />
      </Tabs>
      <UserProfileForm user={user} value={value} index={0} />
      <UserOrdersTable value={value} index={1} />
    </Box>
  );
}

export default UserProfile;
