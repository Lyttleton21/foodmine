'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const port = 1111;
const app = express();
const cors = require('cors');
const food = require('./api/food/route');
const user = require('./api/user/route');
const order = require('./api/order/route');
const orderItem = require('./api/orderItems/route');
const addressLatLng = require('./api/addressLatLng/route');
const dotenv = require('dotenv').config();


const router = express.Router();
app.use(cors());
food.foodRoutes(router);
user.userRoutes(router);
order.orderRoute(router);
orderItem.orderItemRoute(router);
// addressLatLng.addressLatLngRoute(router);

router.use( function(req, res, next)  {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, X-Requested-With, Range, Content-Type');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }else{
        return next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res) =>{
    res.send('Server is up...Catch ya!');
});

app.use(router);
app.listen(port, () =>{
    console.log(`My server is listening on port ${port}`);
});