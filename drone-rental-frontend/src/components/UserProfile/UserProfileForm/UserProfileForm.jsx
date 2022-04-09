import React from 'react';
import PropTypes from 'prop-types';
import UserDataForm from './UserDataForm/UserDataForm';
import UserPassChangeForm from './UserPassChangeForm/UserPassChangeForm';

function UserProfileForm({ user }) {
  const { userData } = user;
  return (
    <>
      <UserDataForm userData={userData} />
      <UserPassChangeForm userData={userData} />
    </>
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
};
UserProfileForm.defaultProps = {
  user: {},
};

export default UserProfileForm;
