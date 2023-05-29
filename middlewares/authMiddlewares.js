const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticationCheck = async (req, res, next) => {
    try {
        //Get the token from the request headers
        const token = req.headers.authorization.split(" ")[1];

        //Verify the token
        const decoded = jwt.verify(token, "manhnh@201");

        const { username } = decoded;
        const user = await User.findOne({ username: username });
        if (user) {
            req.user = user;
            next();
        } else {
            res.send("User does not exist!");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const authorizationCheck = async (req, res, next) => {
    const userRoles = req.user.role;

    //Check xem user nay co quyen lay toan bo user ra khong ?
    if (userRoles.includes("admin")) {
        next();
    } else {
        res.status(200).send("User does not have access permissions!");
    }
};

module.exports = { authenticationCheck, authorizationCheck };
