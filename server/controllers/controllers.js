const express = require("express");
const bcrypt = require("bcryptjs");
const UserData = require('../model/user-model');

const home = async (req,res)=>{
    try {
        res.status(200).json({msg: "Welcome Arpan Mandal- router and controllers hello"});
    } catch (error) {
    res.status(400).json({msg:"Page not found"});
    }
    
}



//------------------------
//User registration
//------------------------

const register = async (req,res,next)=>{
    try {
        console.log(req.body);
        const {username, email, password} = req.body;
        const userExits = await UserData.findOne({email: email});
        if(userExits){
            return res.status(400)
            .json({message: "Email alredy exits"});
        }
        const data = await UserData.create({username, email, password});
        res.status(201).json({
            msg: "Registration successful", 
            token: await data.generateToken(),
            userId: data._id.toString()
        })
    } catch (error) {
        //res.status(400).json({msg:"Page not found"});
        next(error);
    }
    
}



//------------------------
//User login
//------------------------
const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const isExists = await UserData.findOne({email});
        //console.log(isExists)
        if(!isExists){
            res.status(404).json({msg:"Invalid credentials"});
        }
        //const userLogin = await bcrypt.compare(password, isExists.password);
        const userLogin = await isExists.comparePassword(password);
        //console.log(userLogin)
        if(userLogin){
            res.status(200)
            .json({
                msg: "Login successful", 
                token: await isExists.generateToken(),
                userId: isExists._id.toString()
            })
        }else{
            res.status(401).json({msg:"Invalid email & password"});
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Internal error"});
    }
};


//------------------------
//User data logic
//------------------------
const user = async (req, res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        //res.status(200).json({msg:"Hi user"})
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user route ${error}`);
    }
}

module.exports = {home , register, login, user};