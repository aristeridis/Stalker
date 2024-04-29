const router = require('express').Router();
const { message } = require('statuses');
const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
        const userExists = await user.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'user exists ',
            })
        }
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body)
        await newUser.save();
        res.send({
            success: true,
            message: 'user created',
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    };
});
router.post('/login', async (req, res) => {
    try {
        const user = await user.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'user does not exists ',
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);


        if (!validPassword) {
            res.send({
                success: false,
                message: 'invalid pass',
            });
        }
            const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
                expiresIn: "1d",
            });
            res.send({
                success: true,
                message: 'logged in',
                data: token,
            });
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            });
        }
    });
module.exports = router;