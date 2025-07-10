const express = require('express');
const router = express.Router();
const Media = require('../models/media');

router.post('/upload', async (req, res) => {
  try {
    const { name, description, url, type, folder } = req.body;

    if (!url || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const media = new Media({
      name,
      description,
      url,
      type,
      folder,
      uploadedAt: new Date(),
    });

    await media.save();

    res.status(201).json({ message: 'Media saved successfully', media });
  } catch (err) {
    console.error('❌ Failed to save media:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const mediaList = await Media.find().sort({ uploadedAt: -1 }); // newest first
    res.status(200).json(mediaList);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res
      .status(200)
      .json({ message: 'Media deleted successfully', media: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, description, url } = req.body;
  try {
    const updated = await Media.findByIdAndUpdate(
      req.params.id,
      { name, description, url },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update media' });
  }
});
module.exports = router;
