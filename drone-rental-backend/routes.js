const user = require('./api/user');
const drone = require('./api/drone');

function routes(app) {
  app.use('/api/users', user);
  app.use('/api/drones', drone);
  // app.use('/api/products', product);
}

module.exports = routes;
