const User = require('../models/user_model');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res)=>{
    try {
        //(a password and email validation can be added here as well)
        const name = req.body.name;
        const email = req.body.email;

        // unique email
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }
        const user = new User({
            name,
            email
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

exports.signin = async(req, res)=>{
    try {

        const token = req.body.token;
        //console.log(token);

        const decoded = jwt.decode(token);
        const existingUser = await User.findOne({email:decoded.email})
        console.log(existingUser);
        const userData = {
            name: decoded.name,
            email:decoded.email,
            userId: existingUser._id,
            picture:decoded.picture,
            
        }
        const instaToken = jwt.sign(userData,process.env.JWT_KEY,{expiresIn:"1h"});
        console.log(instaToken);

        existingUser ? res.status(200).json({user: userData, token: instaToken}) : res.status(404).json({message: "User Not Found"});
        


    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

exports.all = (req, res)=>{
    const userId = req.params.id;
    User.findById(userId).populate('stories').exec()
    .then(doc=>res.status(200).json(doc))
    .catch(err=>res.status(404).json({message: err}));
}