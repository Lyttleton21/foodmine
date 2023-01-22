const  $foodController = require('./contoller');

exports.foodRoutes = (app) => {
    app.post('/api/create_food', $foodController.foodController.createFood)
    app.get('/api/foods', $foodController.foodController.allFoods);
    app.get('/api/food/:id', $foodController.foodController.foodByID);
    app.get('/api/search/:name', $foodController.foodController.foodByName);
}