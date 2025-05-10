const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'link',
    },
    commentText: {
      type: String,
      minlength: [5, 'Description must be at least 4 characters'],
      maxlength: [100, 'Comment must be less than 101 characters'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
