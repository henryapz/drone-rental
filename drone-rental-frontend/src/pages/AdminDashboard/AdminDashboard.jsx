import { Grid } from '@mui/material';
import React from 'react';
import DetailCard from '../../components/AdminDashboard/DetailCard/DetailCard';
import RecentActivity from '../../components/AdminDashboard/RecentActivity/RecentActivity';
import TotalProfit from '../../components/AdminDashboard/TotalProfit/TotalProfit';
import ApexBarchar from '../../components/Shared/ApexBarchar/ApexBarchar';
import ApexLineChar from '../../components/Shared/ApexLineChar/ApexLineChar';

function AdminDashboard() {
  const styles = {
    container: {
      padding: '20px 10px',
    },
    separation: {
      margin: '20px 0px',
      width: '100%',
    },
  };
  return (
    <div style={styles.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={styles.separation}
      >
        <Grid item xs={12}>
          <TotalProfit />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={styles.separation}>
        <Grid item xs={12} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} md={3}>
          <DetailCard />
        </Grid>
        <Grid item xs={12} md={3}>
          <DetailCard />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={styles.separation}>
        <Grid item xs={8}>
          <ApexBarchar />
          <ApexLineChar />
        </Grid>
        <Grid item xs={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;
