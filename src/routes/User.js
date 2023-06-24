const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.send(users);
    }
});

router.post('/auth/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        if (user) {
            const token = await user.generateToken();
            await user.save();
            res.status(201).send(user);
        } else {
            res.status(400);
        }
    } catch (error) {
        res.send(error);
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken();

        res.send({ user, token });
    } catch (e) {
        //console.log(e)
        res.status(400).send();
    }
});

router.post('/auth/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        user.token = '';
        await user.save();
        res.send();
    } catch (e) {
        //console.log(e)
        res.status(400).send();
    }
});

module.exports = router;
