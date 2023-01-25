const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const User = require('../models/user')(sequelize, Sequelize);
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

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
    )
}
