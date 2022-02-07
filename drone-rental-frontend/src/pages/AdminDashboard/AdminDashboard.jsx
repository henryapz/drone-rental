import { Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailCard from '../../components/AdminDashboard/DetailCard/DetailCard';
import RecentActivity from '../../components/AdminDashboard/RecentActivity/RecentActivity';
import TotalProfit from '../../components/AdminDashboard/TotalProfit/TotalProfit';
import ApexBarchar from '../../components/Shared/ApexBarchar/ApexBarchar';
import ApexLineChar from '../../components/Shared/ApexLineChar/ApexLineChar';
import getAdminDashboarStats from '../../services/api/adminStats';

function AdminDashboard() {
  const data = {
    totalUsers: 0,
    ordersCompleted: 0,
    nonCompletedOrders: 0,
    totalVisits: 0,
  };
  const [stats, setStats] = useState(data);

  useEffect(() => {
    try {
      getAdminDashboarStats().then(resp => {
        setStats(resp);
      });
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error);
    }
  }, []);

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
          <DetailCard name="Usuario Registrados" value={stats.totalUsers}>
            <PeopleIcon />
          </DetailCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard name="Pedidos Completados" value={stats.ordersCompleted}>
            <InventoryIcon />
          </DetailCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard name="Pedidos Por Completar" value={stats.nonCompletedOrders}>
            <InventoryIcon />
          </DetailCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailCard name="Visitas Totales" value={stats.totalVisits}>
            <VisibilityIcon />
          </DetailCard>
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
