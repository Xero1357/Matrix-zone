const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true }
});

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema] // Embed 'comments' schema
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;