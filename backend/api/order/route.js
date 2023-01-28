const $orderContoller = require('./controller');

exports.orderRoute = (app) => {
    app.post('/api/orders/new', $orderContoller.orderController.newOrderforCurrentUser);
}