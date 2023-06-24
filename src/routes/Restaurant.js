const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
        return res.status(400).send();
    }
    res.status(200).send(restaurants);
});

router.post('/restaurant', async (req, res) => {
    try {
        let restaurant = new Restaurant(req.body);

        if (restaurant) {
            await restaurant.save();
            res.status(201).send(restaurant);
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/restaurant/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let restaurant = req.body;
        let updatedRestaurant = await Restaurant.findByIdAndUpdate(id);

        if (!updatedRestaurant) {
            return res.status(400).send({ message: 'Restaurant not found' });
        }
        await res.status(200).send({ message: 'Restaurant updated' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/restaurant/:id', async (req, res) => {
    let id = req.params.id;
    const restaurant = await Restaurant.findOne({ _id: id });
    if (!restaurant) {
        return res.status(400).send();
    }
    res.status(200).send(restaurant);
});

router.delete('/restaurant/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let restaurantToDelete = await Restaurant.findByIdAndDelete(id);
        if (!restaurantToDelete) {
            res.status(400).send({ message: 'Delete unsuccessful' });
        }
        await res.status(200).send({ message: 'Restaurant deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
