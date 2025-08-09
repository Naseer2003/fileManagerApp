const express = require('express');
const fileRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });
const {
  uploadFile,
  deleteFile,
  filesByFolder,
} = require('../controllers/file.controllers');

fileRouter.post('/upload', upload.single('file'), uploadFile); // Changed 'file' to 'image'

fileRouter.get('/:folderId', filesByFolder);
fileRouter.delete('/:id', deleteFile);

module.exports = fileRouter;
