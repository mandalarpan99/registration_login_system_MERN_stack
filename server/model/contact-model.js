const {Schema, model} = require("mongoose");

const contactShhema = Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    message:{
        type: String,
    }
})



const contactData = new model("ContactData", contactShhema);

module.exports = contactData;