const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const User = require('../models/user')(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Order = require('../models/order')(sequelize, Sequelize);
const orderItem = require('../models/orderItem')(sequelize, Sequelize);
// const addressLatLng = require('../models/addressLatLng')(sequelize, Sequelize);
const {Op} = require('sequelize');

User.hasMany(Order, {
    onDelete: 'RESTRICT',
    foreignKey:{
        type: Sequelize.DataTypes.UUID
    }
});

Order.hasMany(orderItem, {
    onDelete: 'RESTRICT',
    foreignKey:{
        type: Sequelize.DataTypes.UUID,
        allowNull: true
    }
});

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

                console.log('i am creating order')
                const newOrder = await Order.create({
                    name: req.body.name,
                    address: req.body.address,
                    totalPrice: req.body.totalPrice,
                    userId: req.body.userId
                });
                if(newOrder instanceof Order) {
                        for(let item of req.body.items){
                        data = {
                            food_id: item.food.id,
                            food_imageUrl: item.food.imageUrl,
                            food_total_price: item.price,
                            food_quantity: item.quantity,
                            food_name: item.food.name,
                            food_price: item.food.price,
                            orderId: newOrder.id
                        }
                        //console.log(data);
                        
                        var $orderItem = await orderItem.create(data)
                    }
                    if($orderItem){
                        res.send({
                            "order":newOrder,
                            "newOrderItem": $orderItem
                        })
                    }
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





                        
