const moongoose = require("mongoose");

const postSchema = new moongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
});

const Post = moongoose.model("Post", postSchema);

module.exports = Post;
