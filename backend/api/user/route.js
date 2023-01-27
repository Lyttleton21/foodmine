const $userController = require('./controller');
//const auth = require('../../middleware/auth.mid')

exports.userRoutes = (app) => {
    app.post('/api/create/user', $userController.userController.signUp);
    app.post('/api/login', $userController.userController.login);
    app.post('/api/save/order', $userController.userController.order)
}