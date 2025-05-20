const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save();
        res.status(201).json(newPost); // Return the newly created post
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addComment = async (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).send('Post not found');
        post.comments.push(comment);
        await post.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllPosts, createPost, updatePost, addComment };