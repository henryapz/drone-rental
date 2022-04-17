const user = require('./api/user');
const drone = require('./api/drone');
const cloudImage = require('./api/cloudImage');
const category = require('./api/category');
const order = require('./api/order');

function routes(app) {
  app.use('/api/users', user);
  app.use('/api/drones', drone);
  app.use('/api/orders', order);
  app.use('/api/images', cloudImage);
  app.use('/api/categories', category);
  // app.use('/api/products', product);
}

module.exports = routes;
