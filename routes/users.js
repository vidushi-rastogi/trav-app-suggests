const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register new user
router.post("/signup", async (req, res) => {
    try {

        //generate encrypted password
        const salt = await bcrypt.genSalt(10);  //hash rounds
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 
        
        //generate new user account
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save new user
        const newSavedUser = await newUser.save();
        res.status(200).json(newSavedUser._id);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//login user
router.post("/login", async (req, res) => {
    try {

        //find user
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(200).json("wrong username or password");  //user not found

        //password validation
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(200).json("wrong username or password");

        //send user as response
        res.status(200).json({_id:user._id, username:user.username});
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();  //find all users
        res.status(200).json(users);   //send all users as response
    }
    catch (err) {
        res.status(500).json(err);
    }
 
});

module.exports = router;