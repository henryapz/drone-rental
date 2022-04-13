const { default: mongoose } = require('mongoose');
const { OrderDetailSchema } = require('./orderDetail.model');

const OrderSchema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderDetail: {
      type: [OrderDetailSchema],
      validate: v => Array.isArray(v) && v.length > 0,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    transactionStatus: {
      type: String,
      enum: ['Success', 'Warning', 'Error'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', OrderSchema);
