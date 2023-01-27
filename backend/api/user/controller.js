const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const User = require('../models/user')(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Order = require('../models/order')(sequelize, Sequelize);
// const orderItem = require('../models/orderItem')(sequelize, Sequelize);
// const addressLatLng = require('../models/addressLatLng')(sequelize, Sequelize);
const {Op} = require('sequelize');

User.hasMany(Order, {
    onDelete: 'RESTRICT',
    foreignKey:{
        type: Sequelize.DataTypes.UUID
    }
});

// Order.hasMany(orderItem, {
//     onDelete: 'RESTRICT',
//     foreignKey:{
//         type: Sequelize.DataTypes.UUID,
//         allowNull: true
//     }
// });

// Order.hasMany(addressLatLng, {
//     onDelete: 'RESTRICT',
//     foreignKey:{
//         type: Sequelize.DataTypes.UUID,
//         allowNull: true
//     }
// });

User.sync();

exports.userController = {
    signUp: asyncHandler(
        async (req, res) => {
            try{
                //TODO: (save user if email as not being use)
                const [user, created] = await User.findOrCreate({
                    where: {email: req.body.email},
                    defaults:{
                        name: req.body.name,
                        email: req.body.email.toLowerCase(),
                        isAdmin: req.body.isAdmin,
                        address: req.body.address,
                        password: await bcrypt.hash(req.body.password, 10)
                    }
                });
                //console.log('USER',user);
                if(!created){
                    res.status(400)
                    .send('User is already exist, plaase login!');
                }
                if(created){
                    let token = jwt.sign({user: user},
                    process.env.secretKey,{ expiresIn: '1h',});
                    res.status(200)
                    .send({
                        //error:false, 
                        user:user,
                        //created:created,
                        //message:"Account Created successfully",
                        token:token
                    });
                }
            }catch(err){
                console.log(err);
            }
        }
    ),

    login: asyncHandler(
        async (req, res) => {
            try{
                const {email, password} = req.body;
                //find a user by their email
                const loginUser = await User.findOne({
                    where: {email:email},
                    attributes: {exclude: ['deletedAt']},
                    raw:true
                });
                //if user email is found, compare password with bcrypt
                if(loginUser){
                    const isSame = await bcrypt.compare(password, loginUser.password);
                     //if password is the same
                    //generate token with the user's id and the secretKey in the env file
                    if(isSame){
                        let token = jwt.sign({user: loginUser},
                            process.env.secretKey,{ expiresIn: '1h',});
                            res.status(200).send({
                                token: token,
                                user: loginUser,
                                error:false
                            })
                    }else{
                        return res.status(401).send({
                            message: 'The password you enter is incorrect',
                            error:true
                        });
                    }
                }else{
                    return res.status(401).send({
                        message: 'The Email you enter is incorrect',
                        error:true
                    });
                }
            }catch(err){
                console.log(err);
                return res.status(401).json({
                    message: 'Authentication failed',
                })
            }
        }
    ),

    order: asyncHandler(
        async (req, res) => {
            let transaction;
            try {
                transaction = await sequelize.transaction();
                const requestOrder = req.body;
                if (requestOrder.items.length <= 0){
                    res.status(400).send('Cart is Empty');
                    return;
                } 
                if(!requestOrder.items.length <= 0){
                     await Order.destroy({
                        where: {
                            userId: {
                              [Op.eq]: requestOrder.userId
                            },
                            status: {
                                [Op.eq]: 'new'
                            }
                        }
                    }, { transaction });

                    const newOrder = await Order.create({
                        name: req.body.name,
                        address: req.body.address,
                        totalPrice: req.body.totalPrice,
                        items: req.body.items,
                        userId: req.body.userId,
                        // addressLatLng: req.body.addressLatLng
                    }, { transaction });
                     if (newOrder instanceof Order) {
                    //     console.log(req.body.items)
                    //     const $orderItem = await orderItem.create({
                            // food_id: req.body.items.food.id,
                            // food_name: req.body.items.food.name,
                            // food_imageUrl: req.body.items.food.imageUrl,
                            // food_total_price: req.body.items.price,
                            // food_quantity: req.body.items.quantity
                            // orderItems: req.body.items,
                            //orderId:newOrder.id
                        // });
                        // const $addressLatLng = await addressLatLng.create({
                        //     // lat: req.body.addressLatLng.lat,
                        //     // lng: req.body.addressLatLng.lng
                        //     addressLatLngs: req.body.addressLatLng,
                        //     //orderId:newOrder.id
                        // }, {transaction});
                        // if($orderItem){
                        //     res.send({
                        //         "order":newOrder, 
                        //         "newOrderItem": $orderItem
                        //     });
                        // }
                        res.send(newOrder)
                    }
                    // else{
                    //     res.send('Error in creating order');
                    // }
                }
                else{
                    res.status(400).send('Error in creating order');
                }
                await transaction.commit();
            } 
            catch (error) {
                console.log(error);
                if(transaction) {
                await transaction.rollback();
                }
            }
        }
    )
}
