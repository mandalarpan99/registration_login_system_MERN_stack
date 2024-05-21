const express = require("express");
const serviceData = require("../model/service-model");

const Service = async (req, res)=>{
    try {
        const response = await serviceData.find();
        //console.log("Response from server for service ", response);
        if(!response){
            res.status(400).json({msg: "Data not found"});
        }
        res.status(200).json({msg: response});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Unseccessfull"})
    }
}




module.exports = Service;