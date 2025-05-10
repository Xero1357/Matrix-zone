const Link = require('../models/linkModel');
const Collection = require('../models/collectionModel');

// Create new link
const createLink = async (req, res) => {
  try {
    const { url, title, description, collectionId } = req.body;

    if (!url || !title || !collectionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLink = new Link({
      url,
      title,
      description,
      collectionId,
      userId: req.userId, // comes from isLoggedIn middleware
    });

    await newLink.save();

    await Collection.findByIdAndUpdate(collectionId, {
      $push: { linkIds: newLink._id },
    });

    res.status(201).json(newLink);
  } catch (error) {
    console.error('Create Link Error:', error);

    // Handling Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};

      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res.status(400).json({ errors: validationErrors });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all links
const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().populate('collectionId').populate('userId');
    res.status(200).json(links);
  } catch (error) {
    console.error('Get Links Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get one link by ID
const getLinkById = async (req, res) => {
  const linkId = req.params.linkId;

  if (!linkId) {
    return res.status(400).json({ message: 'Missing link ID in request' });
  }

  try {
    const link = await Link.findById(linkId).lean();

    if (!link) {
      return res
        .status(404)
        .json({ message: `Link with ID ${linkId} not found` });
    }

    res.status(200).json(link);
  } catch (err) {
    console.error('Get Link By ID Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { url, title, description, collectionId } = req.body;

    // Find current link
    const existingLink = await Link.findById(linkId);
    if (!existingLink) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Check URL if needed
    if (url && typeof url === 'string') {
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: 'Invalid URL format' });
      }
    }

    // Update collection if collectionId has changed
    if (collectionId && collectionId !== existingLink.collectionId.toString()) {
      const newCollection = await Collection.findById(collectionId);
      if (!newCollection) {
        return res.status(404).json({ error: 'New collection not found' });
      }

      // Remove from old collection
      await Collection.findByIdAndUpdate(existingLink.collectionId, {
        $pull: { linkIds: linkId },
      });

      // Add to new collection
      await Collection.findByIdAndUpdate(collectionId, {
        $addToSet: { linkIds: linkId },
      });

      existingLink.collectionId = collectionId;
    }

    // Update remaining fields
    if (url !== undefined) existingLink.url = url;
    if (title !== undefined) existingLink.title = title;
    if (description !== undefined) existingLink.description = description;

    await existingLink.save();

    res.status(200).json(existingLink);
  } catch (error) {
    console.error('Update Link Error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors: validationErrors });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete link
const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;

    // Find the link to get the collectionId
    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Delete the link
    await Link.findByIdAndDelete(linkId);

    // Remove linkId from collection.linkIds
    if (link.collectionId) {
      await Collection.findByIdAndUpdate(link.collectionId, {
        $pull: { linkIds: link._id },
      });
    }

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Delete Link Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkById,
  updateLink,
  deleteLink,
};
