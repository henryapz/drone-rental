import React from 'react';
import { PropTypes } from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectPath = '/landing', children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children && <Outlet />;
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.elementType,
};

ProtectedRoute.defaultProps = {
  isAllowed: false,
  redirectPath: '/landing',
  children: null,
};

export default ProtectedRoute;
