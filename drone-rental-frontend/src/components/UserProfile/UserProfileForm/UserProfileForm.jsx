import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DefaultProfileImage from '../../../assets/images/user.png';
import UserDataForm from './UserDataForm/UserDataForm';
import UserPassChangeForm from './UserPassChangeForm/UserPassChangeForm';

function UserProfileForm({ user, value, index }) {
  const { userData } = user;
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
    <div style={styles.container} hidden={value !== index}>
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
            {`${user.userData.firstName || ''} ${user.userData.lastName || ''}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UserDataForm userData={userData} />
          <UserPassChangeForm userData={userData} />
        </Grid>
      </Grid>
    </div>
  );
}

UserProfileForm.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.shape({
      address: PropTypes.string,
      createdAt: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      password: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string,
      token: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    }),
  }),
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
UserProfileForm.defaultProps = {
  user: {},
};

export default UserProfileForm;
