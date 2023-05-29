const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.password = req.body.password;
        user.role = req.body.role;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        //Lay user tu params
        const username = req.params.username;

        //Check xem username co phai cua user hien tai k
        const currentUser = req.user;
        if (currentUser.username === username) {
            res.status(400).send("This user cannot be deleted!");
            return;
        }

        //Check xem username co trong db khong ?
        //Tim xem user co trong db khong ?
        const user = await User.findOne({ username });
        if (user) {
            await User.deleteOne({ username });
            res.status(200).send("User deleted!");
        } else {
            res.status(404).send("User not found!");
        }
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
