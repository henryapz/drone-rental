import { Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import DetailCard from '../../../components/admin/Dashboard/DetailCard/DetailCard';
import RecentActivity from '../../../components/admin/Dashboard/RecentActivity/RecentActivity';
import TotalProfit from '../../../components/admin/Dashboard/TotalProfit/TotalProfit';
import ApexBarchar from '../../../components/Shared/ApexBarchar/ApexBarchar';
import ApexLineChar from '../../../components/Shared/ApexLineChar/ApexLineChar';
import {
  getUserCount,
  getTotalEarning,
  getTotalMontlyStats,
  getRecentDrones,
} from '../../../services/api/adminStats';

function AdminDashboard() {
  const user = useSelector(state => state.user);
  const initialData = {
    totalUsers: 0,
    ordersCompleted: 0,
    nonCompletedOrders: 0,
  };
  const [stats, setStats] = useState(initialData);
  const [profit, setProfit] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState({ totalEarningsByMonths: [] });
  const [droneOrders, setdroneOrders] = useState([]);

  useEffect(() => {
    try {
      getUserCount(user.userData.token).then(resp => {
        setStats(resp.data);
      });
      getTotalEarning(user.userData.token).then(resp => {
        setProfit(resp.data.totalEarnings[0].amount);
      });
      getTotalMontlyStats(user.userData.token).then(resp => {
        setMonthlyStats(resp.data);
      });
      getRecentDrones(user.userData.token)
        .then(response => response.data)
        .then(data => {
          const drones = [];
          const { recentOrders } = data;
          for (let i = 0; i < recentOrders.length; i += 1) {
            const { items, createdAt } = recentOrders[i];
            for (let j = 0; j < items.length; j += 1) {
              const item = items[j];
              const itemId = item._id;
              drones.push({ createdAt, ...item.droneId, itemId });
            }
          }
          setdroneOrders(drones);
        });
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error);
    }
  }, [user.userData.token]);

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
          <TotalProfit profit={profit} />
        </Grid>
      </Grid>
      <Grid container spacing={2} pb="20px">
        <Grid item xs={12} sm={6} md={4}>
          <DetailCard name="Usuario Registrados" value={stats.totalUsers}>
            <PeopleIcon />
          </DetailCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailCard name="Pedidos Completados" value={stats.ordersCompleted}>
            <InventoryIcon />
          </DetailCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailCard name="Pedidos Por Completar" value={stats.nonCompletedOrders}>
            <InventoryIcon />
          </DetailCard>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ApexBarchar totalEarningsByMonths={monthlyStats.totalEarningsByMonths} />
          <ApexLineChar totalEarningsByMonths={monthlyStats.totalEarningsByMonths} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentActivity droneOrders={droneOrders} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
