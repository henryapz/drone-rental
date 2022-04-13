import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import UserProfileForm from '../../components/UserProfile/UserProfileForm/UserProfileForm';
import DefaultProfileImage from '../../assets/images/user.png';

function UserProfile() {
  const user = useSelector(state => state.user);
  const styles = {
    container: {
      padding: '20px 10px',
    },
    containerImage: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
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
        <Grid item xs={3} style={styles.containerImage}>
          <img src={DefaultProfileImage} alt="Profile" />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Cambiar foto
            <input type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h4">
            Bienvenido
          </Typography>
          <Typography gutterBottom variant="h3">
            {`${user.userData.firstName} ${user.userData.lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UserProfileForm user={user} />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
