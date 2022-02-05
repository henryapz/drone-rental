import { Grid, Typography } from '@mui/material';
import React from 'react';
import UserProfileForm from '../../components/UserProfile/UserProfileForm/UserProfileForm';

function UserProfile() {
  const imgUrl = 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png';
  const styles = {
    container: {
      padding: '20px 10px',
    },
  };
  return (
    <div style={styles.container}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <img src={imgUrl} alt="Profile" />
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h4">
            Bienvenido
          </Typography>
          <Typography gutterBottom variant="h3">
            Name Name
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UserProfileForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
