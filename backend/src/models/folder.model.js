const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const FolderModel = mongoose.model("folder", folderSchema);
module.exports = FolderModel;