const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const insertData = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },isAdmin:{
        type: Boolean,
        default: false
    }
})

insertData.pre("save", async function(next){
    // console.log("Pre data", this);
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;


    } catch (error) {
        next(error);
    }
})


// to compare password
insertData.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


insertData.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )
    } catch (error) {
        console.error(error)
    }
}




const userData = new mongoose.model("User", insertData);

module.exports = userData;