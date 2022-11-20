const express = require('express')
const restaurantController =require('../controllers/restaurantController')
const router =express.Router();
const { authenticate } = require("../controllers/userController");
router.get('/',restaurantController.getAllRestaurant)
router.get('/home',restaurantController.getRestaurantHome)
router.get('/:id',restaurantController.getRestaurantById)
router.put('/:id',authenticate,restaurantController.updateRestaurant)
router.post('/',authenticate,restaurantController.createRestaurant )

module.exports=router; 