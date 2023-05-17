import express from 'express'
import multer  from 'multer';
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { storage } = require('../Config/firebaseConfig'); // Import the Firebase storage configuration

const uploadRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    // Get the file from the request
    const file = req.file;

    // Check if file exists
    if (!file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Create a new filename
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;

    // Create a new blob in the Firebase storage
    const blob = storage.bucket().file(filename);

    // Create a writable stream
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Listen for errors
    blobStream.on('error', (error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });

    // Listen for finish event
    blobStream.on('finish', () => {
      // Get the public URL of the uploaded file
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket().name}/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      res.status(200).json({ filename, publicUrl });
    });

    // Write the file buffer to the blob stream
    blobStream.end(file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = uploadRouter;