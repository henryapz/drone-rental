const mongoose = require('mongoose');

const CloudImageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    asset_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CloudImage', CloudImageSchema);
