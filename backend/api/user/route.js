const $userController = require('./controller');

exports.userRoutes = (app) => {
    app.post('/api/create/user', $userController.userController.signUp);
    app.post('/api/login', $userController.userController.login);
}