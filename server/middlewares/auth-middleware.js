const jwt = require("jsonwebtoken");
const User = require('../model/user-model');
const userData = require("../model/user-model");
const authMiddleware = async (req, res, next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message: "Unauthorzed HTTP, toen not provide"});
    }
    console.log("token from auth middleware". token);
    const jwtToken = token.replace("Bearer", "").trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        //console.log(isVerified);
        const userdata = await User.findOne({email: isVerified.email}).select({password:0});
        console.log("from server side",userdata);
        req.user = userdata;
        req.token = token;
        req.userTD = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorzed HTTP, toen not provide"});
    }

};





module.exports = authMiddleware;