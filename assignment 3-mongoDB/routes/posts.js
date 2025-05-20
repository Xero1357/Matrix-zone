const express = require('express');
const {
    getAllPosts,
    createPost,
    updatePost,
    addComment
} = require('../controllers/postsController');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.post('/:id/comments', addComment);

module.exports = router;