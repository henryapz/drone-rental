import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import UserOrdersTable from '../../../components/Shared/Orders/UserOrdersTable';

function Orders() {
  return (
    <Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography flex="1 1 100%" variant="h6">
            Órdenes
          </Typography>
        </Toolbar>
        <UserOrdersTable countShow={8} />
      </Paper>
    </Box>
  );
}

export default Orders;
