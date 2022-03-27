const mongoose = require('mongoose');

const DroneSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      uppercase: true,
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
      required: true,
    },
    presentationImages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CloudImage',
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Drone', DroneSchema);
