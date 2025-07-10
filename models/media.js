const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['image', 'video'], required: true },
  folder: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', mediaSchema);
