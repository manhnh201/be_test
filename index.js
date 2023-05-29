const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/connectDb");
const userRouters = require("./routes/user");
const postRoutes = require("./routes/post");
const User = require("./models/User");
const { authenticationCheck } = require("./middlewares/authMiddlewares");

const port = 3000;
app.use(express.json());

db.connect();

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        res.status(200).send("User already exists!");
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            username,
            password: hashPassword,
            role: ["user"],
        });
        res.send(user);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    //Check trong db
    const user = await User.findOne({ username });
    //Neu co thi tra token, con khong thi tra error
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: username }, "manhnh@201");
        //Tra token cho client
        res.send({ token: token });
    } else {
        res.send("User does not exist!");
    }
});

app.use("/users", authenticationCheck, userRouters);
app.use("/posts", authenticationCheck, postRoutes);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
