const express = require('express')
const reviewController =require('../controllers/reviewController')
const { authenticate } = require("../controllers/userController");
const router =express.Router();

router.get('/', reviewController.getAllReview )
router.get('/:id',reviewController.getReviewById )
router.post('/',authenticate,reviewController.createReview )
// router.put('/:id',reviewController.updateReview )
router.delete('/:id',authenticate,reviewController.deleteReview )
module.exports=router; 