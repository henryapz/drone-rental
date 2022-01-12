import { Box, Grid } from '@mui/material';
import React from 'react';
import DetailCard from '../../components/AdminDashboard/DetailCard/DetailCard';
import RecentActivity from '../../components/AdminDashboard/RecentActivity/RecentActivity';
import TotalProfit from '../../components/AdminDashboard/TotalProfit/TotalProfit';
import ApexBarchar from '../../components/Shared/ApexBarchar/ApexBarchar';
import ApexLineChar from '../../components/Shared/ApexLineChar/ApexLineChar';

function AdminDashboard() {
  return (
    <Box>
      <Grid
        container
        pb="20px"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <TotalProfit />
        </Grid>
      </Grid>
      <Grid container spacing={2} pb="20px">
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ApexBarchar />
          <ApexLineChar />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
