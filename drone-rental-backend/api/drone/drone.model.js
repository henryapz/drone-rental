const mongoose = require('mongoose');

const DroneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    pricePerWeek: {
      type: Number,
    },
    pricePerMonth: {
      type: Number,
    },
    productImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CloudImage',
    },
    presentationImages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CloudImage',
    },
    // category_id:{},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Drone', DroneSchema);
