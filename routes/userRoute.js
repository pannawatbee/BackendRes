const express = require('express')
const userController =require('../controllers/userController')
const router =express.Router();

router.post('/login',userController.login )
router.post('/register',userController.register )
// router.get('/:id',userController.getUserById )
// router.put('/:id',reviewController.updateReview )
// router.delete('/:id',userController.deleteReview )
module.exports=router; 