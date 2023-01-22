const Sequelize = require('sequelize');
const sequelize = require('../../config/connection');
const Food = require('../models/food')(sequelize, Sequelize);
const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler');

Food.sync();

exports.foodController = {
    createFood: asyncHandler(
        async (req, res) => {
            try{
                const data = {
                    name:req.body.name,
                    price:req.body.price,
                    tags:req.body.tags,
                    favorite:req.body.favorite,
                    star:req.body.star,
                    imageUrl:req.body.imageUrl,
                    cookTime:req.body.cookTime,
                    origin:req.body.origin
                }
                const $food = await Food.create(data);
                if(!$food instanceof Food){
                    res.send({
                        error:true,
                        message:'Food is unable to create!!!'
                    });
                }else{
                    res.status(200).send({
                    error:false,
                    message:'Food Created successfully' 
                });
                }
            }
            catch(err){
                console.log(err);
            }
        }
    ),

    allFoods: asyncHandler(
        async (req, res) => {
            try{
                const getAllFoods = await Food.findAll({
                    raw:true,
                    order: sequelize.random(),
                });
                if(!getAllFoods){
                    res.send({
                        error:true,
                        message:'Unable to get all foods'
                    });
                }else{
                    res.send(getAllFoods);
                }
            }catch(err){
                throw err;
            }
        }
    ),

    foodByID: asyncHandler(
        async (req, res) => {
            try{
                const {id} = req.params;
                const findFoodById = await Food.findByPk(id);
                if(findFoodById === null){
                    res.send({
                        error:true,
                        message:'Unable to find the id you enter!!!'
                    });
                }else{
                    res.status(200)
                    .send(findFoodById);
                }
            }catch(err){
                throw err;
            }
        }
    ),

    foodByName: asyncHandler(
        async (req, res) => {
            try{
                const {name} = req.params;
                const findFoodByName = await Food.findAll({
                    where: {
                        name: {
                            [Op.iLike] : `%${name}%`
                        }
                    },
                    order: sequelize.random(),
                    raw:true
                });
                if(findFoodByName === null){
                    res.send({
                        message:'ERROR' 
                    });
                }else{
                    res.send(findFoodByName);
                }
            }catch(err){
                throw err;
            }
        }
    )
}