const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // already configured
const FileModel = require('../models/file.model');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: req.body.folder || 'default' },
      async (error, uploadedFile) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: error.message });
        }

        const file = new FileModel({
          name: uploadedFile.original_filename,
          url: uploadedFile.secure_url,
          folder: req.body.folder || 'default',
          size: uploadedFile.bytes,
          type: uploadedFile.format,
        });
        await file.save();

        res.json(file);
      },
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Upload file error:', err);
    res.status(500).json({ error: err.message });
  }
};

const filesByFolder = async (req, res) => {
  try {
    const files = await FileModel.find({ folder: req.params.folder });
    res.json(files);
  } catch (err) {
    console.error('Files by folder error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await FileModel.aggregate([
      { $group: { _id: '$folder', totalItems: { $sum: 1 } } },
    ]);
    res.json(folders);
  } catch (err) {
    console.error('Get folders error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadFile, getFolders, filesByFolder, upload };
