const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: [String],
});

const User = moongoose.model("User", userSchema);

module.exports = User;
