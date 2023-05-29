const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createPost = async (req, res) => {};
const updatePost = async (req, res) => {};
const deletePost = async (req, res) => {};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
