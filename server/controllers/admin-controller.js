const user = require("../model/user-model");
const selectAllData = async (req, res)=>{
    try {
        const respose = await user.find({},{password:0});
        if(!respose || respose === 0){
            return res.status(402).json({message: "No user found"});
        }
        return res.status(200).json(respose);
    } catch (error) {
        next(error);
    }
}


module.exports = selectAllData;