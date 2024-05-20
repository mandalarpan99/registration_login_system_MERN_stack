const express = require("express");
const contactData = require("../model/contact-model");

const Contact = async (req, res)=>{
    try {
        const cData = req.body;
        await contactData.create(cData);
        res.status(200).json({msg: "Data insert successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Unseccessfull"})
    }
}




module.exports = Contact;