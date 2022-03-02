const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    animationUrl: {
      type: String,
      required: true,
    },
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CloudImage',
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Category', CategorySchema);
