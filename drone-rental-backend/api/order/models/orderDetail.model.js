const { default: mongoose } = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  droneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
    required: true,
  },
});

module.exports = {
  OrderDetailSchema,
};
