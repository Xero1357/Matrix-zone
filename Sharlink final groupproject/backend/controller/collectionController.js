const Collection = require('../models/collectionModel');

// Seed hardcoded collections
const seedCollections = async (req, res) => {
  try {
    const collectionsData = [
      {
        title: 'Favorite Coffee Spots',
        linkIds: [],
      },
      {
        title: 'Must-See Movies',
        linkIds: [],
      },
      {
        title: 'Hidden Gem Restaurants',
        linkIds: [],
      },
      {
        title: 'Dream Travel Destinations',
        linkIds: [],
      },
      {
        title: 'Inspiring Musicians',
        linkIds: [],
      },
      {
        title: 'Cozy Bookstores',
        linkIds: [],
      },
      {
        title: 'Weekend Getaways',
        linkIds: [],
      },
      {
        title: 'Local Art & Museums',
        linkIds: [],
      },
      {
        title: 'Best Podcasts Right Now',
        linkIds: [],
      },
      {
        title: 'Home Decor Inspo',
        linkIds: [],
      },
    ];

    // Add new collections
    const inserted = await Collection.insertMany(collectionsData);

    res.status(201).json({
      message: 'Collections seeded successfully',
      data: inserted,
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed collections' });
  }
};

// Get all collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate("linkIds", "title");
    res.status(200).json(collections);
  } catch (err) {
    console.error('Get collections error:', err);
    res.status(500).json({ error: 'Failed to retrieve collections.' });
  }
};

// Get one collection by ID
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(
      req.params.collectionId
    ).populate("linkIds", "title");
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const 
getUserCollections = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware
    const collections = await Collection.find({ userId }).populate(
      "linkIds",
      "title"
    );
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error fetching user collections:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
};
const createCollection = async (req, res) => {
  try {
    const { title, coverImage } = req.body;

    if (!title || title.length < 5 || title.length > 30) {
      return res.status(400).json({ error: 'Title must be 5–30 characters long.' });
    }

    const newCollection = new Collection({
      title,
      userId: req.userId, // comes from isLoggedIn middleware
      linkIds: [],
      coverImage,
    });

    await newCollection.save();

    res.status(201).json({
      message: 'Collection created successfully',
      collection: newCollection,
    });
  } catch (error) {
    console.error('Create collection error:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
};

const updateCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { title, coverImage } = req.body;

    if (title && (title.length < 5 || title.length > 30)) {
      return res.status(400).json({ error: 'Title must be 5–30 characters long.' });
    }

    const collection = await Collection.findOne({ _id: collectionId, userId: req.userId });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found or unauthorized' });
    }

    if (title !== undefined) collection.title = title;
    if (coverImage !== undefined) collection.coverImage = coverImage;

    await collection.save();

    res.status(200).json({
      message: 'Collection updated successfully',
      collection,
    });
  } catch (error) {
    console.error('Update collection error:', error);
    res.status(500).json({ error: 'Failed to update collection' });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;

    const collection = await Collection.findOneAndDelete({
      _id: collectionId,
      userId: req.userId,
    });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found or unauthorized' });
    }

    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Delete collection error:', error);
    res.status(500).json({ error: 'Failed to delete collection' });
  }
};


const likeCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });

    // Prevent duplicate likes by checking userId
    if (collection.likedBy.includes(req.userId)) {
      return res.status(400).json({ error: 'Already liked' });
    }

    // Increase likes
    collection.likes = (collection.likes || 0) + 1;
    collection.likedBy.push(req.userId);

    await collection.save();
    res.status(200).json({ likes: collection.likes });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ error: 'Failed to like collection' });
  }
};

const unlikeCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });

    const userIndex = collection.likedBy.indexOf(req.userId);
    if (userIndex === -1) {
      return res.status(400).json({ error: 'You have not liked this collection' });
    }

    // Decrease likes
    collection.likes = Math.max(0, (collection.likes || 0) - 1);
    collection.likedBy.splice(userIndex, 1);

    await collection.save();
    res.status(200).json({ likes: collection.likes });
  } catch (error) {
    console.error('Unlike error:', error);
    res.status(500).json({ error: 'Failed to unlike collection' });
  }
};

module.exports = {
  seedCollections,
  getAllCollections,
  getCollectionById,
  getUserCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  likeCollection,
  unlikeCollection,
};
