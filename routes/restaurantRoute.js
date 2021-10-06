const express = require('express')
const restaurantController =require('../controllers/restaurantController')
const router =express.Router();

router.get('/',restaurantController.getAllRestaurant)
router.get('/:id',restaurantController.getRestaurantById)
router.put('/:id',restaurantController.updateRestaurant)
// router.post('/',restaurantController.createCustomer )
// router.delete('/:id',restaurantController.deleteCustomer )
module.exports=router; 