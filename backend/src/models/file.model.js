const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'folder',
    required: true,
  },
  public_id: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model('file', fileSchema);
module.exports = FileModel;
