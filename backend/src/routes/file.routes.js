const express = require('express');
const fileRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });
const {
  uploadFile,
  getFolders,
  filesByFolder,
} = require('../controllers/file.controllers');

fileRouter.post('/upload', upload.single('image'), uploadFile); // Changed 'file' to 'image'
fileRouter.get('/folders', getFolders);
fileRouter.get('/:folder', filesByFolder);

module.exports = fileRouter;
