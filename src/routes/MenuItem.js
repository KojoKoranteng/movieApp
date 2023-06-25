const express = require('express');
const Menu = require('../models/MenuItem');
const router = express.Router();

router.get('/menus', async (req, res) => {
    const menus = await Menu.find({});
    if (!menus) {
        return res.status(400).send();
    }
    res.status(200).send(menus);
});

router.post('/menu', async (req, res) => {
    try {
        let menuItem = new Menu(req.body);

        if (menuItem) {
            await menuItem.save();
            res.status(201).send(menuItem);
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/menu/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let menu = req.body;
        let updatedmenu = await Menu.findByIdAndUpdate({ _id: id }, menu);

        if (!updatedmenu) {
            return res.status(404).send({ message: 'menu not found' });
        }
        res.status(200).send({ message: 'menu updated' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/menu/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let menuToDelete = await Menu.findByIdAndDelete({ _id: id });
        if (!menuToDelete) {
            res.status(400).send({ message: 'Delete unsuccessful' });
        }
        await res.status(200).send({ message: 'menu deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
