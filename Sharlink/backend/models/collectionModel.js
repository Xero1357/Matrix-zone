const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    linkIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'link',
      },
    ],
    title: {
      type: String,
      required: true,
      minlength: [5, 'Description must be at least 4 characters'],
      maxlength: [30, 'Title must be less than 31 characters'],
    },
    coverImage: {
      type: String, // base64-encoded image string
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('collection', collectionSchema);
