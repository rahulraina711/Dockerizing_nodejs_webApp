const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

router.post('/signup', user_controller.signup); // new user registeration route

router.post('/signin', user_controller.signin); // existing user login route

router.get('/all/:id', user_controller.all);

// router.get('/', (req, res)=>{res.status(200).json({message:"You are in user routes"})});  // default user route

module.exports = router;