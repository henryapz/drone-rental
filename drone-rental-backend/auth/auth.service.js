const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');
const { getUserByEmail } = require('../api/user/user.service');

function signToken(payload) {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });

  return token;
}

async function validateToken(token) {
  try {
    const payload = await jwt.verify(token, process.env.TOKEN_KEY);
    return payload;
  } catch (err) {
    return null;
  }
}

function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    // proceder a validar que el token no se haya expirado
    /* const token = authHeader.split(' ')[1] 1 */
    const [, token] = authHeader.split(' ');
    const payload = await validateToken(token);
    if (!payload) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await getUserByEmail(payload.email);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  signToken,
  isAuthenticated,
};
