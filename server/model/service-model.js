const {Schema, model} = require("mongoose");

const serviceShema = Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    duration:{
        type: String,
    }
})



const serviceData = new model("Service", serviceShema);

module.exports = serviceData;