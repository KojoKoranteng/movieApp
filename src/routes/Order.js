const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/orders', async (req, res) => {
    const Orders = await Order.find({});
    if (!Orders) {
        return res.status(400).send();
    }
    res.status(200).send(Orders);
});

router.get('/my-orders', auth, async (req, res) => {
    let orders = await Order.find({}).where('user').equals(req.user._id);
    if (!orders) {
        return res.status(400).send();
    }
    res.status(200).send(orders);
});

router.post('/order', auth, async (req, res) => {
    console.log(req.user);
    try {
        const customer = req.user;
        let newOrder = new Order({
            ...req.body,
            customer: customer._id
        });
        console.log(newOrder);
        if (newOrder) {
            await newOrder.save();
            res.status(201).send(newOrder);
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500).send({ 'Error:': error });
    }
});

router.put('/order/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let order = req.body;
        let updatedOrder = await Order.findByIdAndUpdate({ _id: id }, order);

        if (!updatedOrder) {
            return res.status(400).send({ message: 'order not found' });
        }
        res.status(200).send({ message: 'Order updated' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/order/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let orderToDelete = await Order.findByIdAndDelete({ _id: id });
        if (!orderToDelete) {
            res.status(400).send({ message: 'Delete unsuccessful' });
        }
        await res.status(200).send({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
