const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [8, 'Email must be at least 8 characters'],
      maxlength: [50, 'Email must be less than 50 characters'],
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
      minlength: [2, 'Nickname must be at least 2 characters'],
      maxlength: [20, 'Nickname must be less than 21 characters'],
    },
    password: {
      type: String,
      minlength: [4, 'Password must be at least 3 characters'],
      // maxlength: [12, 'Password must be less than 13 characters'],
      required: true,
    },
    commentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    linkIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'link',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
