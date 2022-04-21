const verifyAdminRole = (req, res, next) => {
  const { user } = req;

  if (!user || user.role === 'User') {
    res.status(403).send('Invalid user role');
  }
  next();
};

module.exports = verifyAdminRole;
