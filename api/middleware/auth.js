const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.auth
        console.log(token);
        if(!token) res.status(404).json({message:"Token unavailsble"})

        const decoded = jwt.decode(token);
        console.log(decoded);
        req.userData = decoded;
        next();
    }
    catch(errr){
        res.status(500).json({message:err});
    }
}