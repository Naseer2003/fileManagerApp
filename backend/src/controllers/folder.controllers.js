const FolderModel = require('../models/folder.model');
const FileModel = require('../models/file.model');

const createfolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    const existing = await FolderModel.findOne({ name });
    if (existing)
      return res.status(400).json({ error: 'Folder already exists' });

    const folder = new FolderModel({ name });
    await folder.save();

    res.status(201).json(folder);
  } catch (error) {
    console.log('Folder error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await FolderModel.aggregate([
      {
        $lookup: {
          from: 'files',
          localField: '_id',
          foreignField: 'folder',
          as: 'files',
        },
      },
      {
        $addFields: {
          totalItems: { $size: '$files' },
        },
      },
      {
        $project: {
          name: 1,
          totalItems: 1,
        },
      },
    ]);
    res.json(folders);
  } catch (error) {
    console.log('Get Folder error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFolders, createfolder };
