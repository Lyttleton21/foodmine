const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const User = require('../models/user')(sequelize, Sequelize);
const Order = require('../models/order')(sequelize, Sequelize);
const orderItem = require('../models/orderItem')(sequelize, Sequelize);
const asyncHandler = require('express-async-handler');
const {Op} = require('sequelize');

Order.belongsTo(User);

Order.sync();

exports.orderController = {
    newOrderforCurrentUser: asyncHandler(
        async (req, res) => {
            try {
                //console.log("REQUEST", req.body.currentUserID);
                const newOrder = await Order.findAll({
                    where: {
                        userId:{
                            [Op.eq]: req.body.currentUserID
                        },
                        status:{
                            [Op.eq]: 'new'
                        }
                    },
                    raw: true
                });
                if(newOrder) {
                     const order = newOrder
                     for(var $order of order){
                        //console.log('ORDER_ID',$order.id)
                     }
                    const currentUserOrderItems = await orderItem.findAll({
                        where: {
                            orderId: {
                                [Op.eq]: $order.id
                            }
                        },
                        raw: true
                    });
                    if(currentUserOrderItems){
                        res.send({
                            newOrder, 
                            currentUserOrderItems
                        })
                    }else{
                        res.send('Error In Getting OrderItems')
                    }
                }else{
                    res.status(400).send("User Order Not Available... PLease Go To The Cart Page");
                }
            } catch (error) {
                console.log(error)
            }
        }
    )
}