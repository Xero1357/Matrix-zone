const Link = require('../models/linkModel');

const isLinkOwner = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.linkId);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    if (link.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied. Not the owner.' });
    }

    next();
  } catch (error) {
    console.error('Ownership check failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { isLinkOwner };
