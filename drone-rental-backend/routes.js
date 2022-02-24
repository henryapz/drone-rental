const user = require('./api/user');

function routes(app) {
  app.use('/api/users', user);
  // app.use('/api/products', product);
}

module.exports = routes;
