const express = require('express');
const folderRouter = express.Router();
const {
  createfolder,
  getFolders,
} = require('../controllers/folder.controllers');

folderRouter.post('/', createfolder);
folderRouter.get('/get_folders', getFolders);

module.exports = folderRouter;
