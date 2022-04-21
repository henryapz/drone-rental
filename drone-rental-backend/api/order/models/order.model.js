const { default: mongoose } = require('mongoose');
const { OrderDetailSchema } = require('./orderDetail.model');

const OrderSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    delivery: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [OrderDetailSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    transactionStatus: {
      type: String,
      enum: ['Success', 'Warning', 'Failed', 'Pending'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', OrderSchema);
