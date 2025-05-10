const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'collection',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    commentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    url: {
      type: String,
      required: true,
      minlength: [5, 'URL must be at least 4 characters 4 symbols'],
      // match: [/^https?:\/\/[\w.-]+\.[a-z]{2,}/, 'Please enter a valid URL'],
    },
    title: {
      type: String,
      required: true,
      minlength: [5, 'Description must be at least 4 characters'],
      maxlength: [100, 'Title must be less than 101 characters'],
    },
    description: {
      type: String,
      required: false,
      // minlength: [5, 'Description must be at least 4 characters'],
      // maxlength: [200, 'Description must be less than 201 characters'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('link', linkSchema);
