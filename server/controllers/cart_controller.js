const swag = require('../models/swag');

// swag item looks like => { id: 1, title: 'Snapback ( red )', category: 'hats', price: 10 },

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        let swagIndex = cart.findIndex(item => item.id == id);

        if (swagIndex === -1) {
            const selectedSwag = swag.find(item => item.id == id);
            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }

        res.status(200).json(req.session.user)
    },
    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;

        let selectedSwag = swag.find(item => item.id == id);

        if (selectedSwag) {
            let swagIndex = cart.findIndex(item => item.id == id);
            cart.splice(swagIndex, 1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).json(req.session.user);
    },
    checkout: (req, res, next) => {
        const { user } = req.session;

        user.cart = [];
        user.total = 0;

        res.status(200).json(req.session.user);
    }
}