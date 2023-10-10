const express = require("express");
const user = express.Router();
const {sequelize} = require("../config/connection.js");
const {UserModel} = require("../modules/usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



user.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    await sequelize.sync();

    try {
         // checking for filling of all the required fields;
    if(email&&password){

        //checking for, is user is new or not;
        let user = await UserModel.findOne({where:{email:email}});
        if(user){
            res.status(409).send("User with this Email ID already exist!");
        }else{

            //Bcrypting the password for security perpose;
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log(err);
                    res.status(400).json("Opps!, Something Went Wrong Please Try Again After SameTime!");
                }else{
                   let date = Date();
                await UserModel.create({email:email,password:hash,date});
                    res.status(200).send("user register successfull");
                }
            })
        }
    }else{
        res.status(400).send("Please Fill all the Fields");
    }
    
    } catch (error) {
        res.status(500).send({"Error":error.message});
    }

   
})

user.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    await sequelize.sync();

    try {

    let user = await UserModel.findOne({where:{email:email}});
    console.log(user);

    //checking for the user is already signup or not;
    if(user){

        //checking for the password is correct or not;
        bcrypt.compare(password,user.dataValues.password,(err,result)=>{
            if(result){
                const last_logged_in = Date();
                const token = jwt.sign({UserID:user.dataValues.id,UserCreatedAt:user.dataValues.date,UserLastLogin:last_logged_in},process.env.key);
                res.status(200).send(token);
            }else{
                res.status(400).send("Invalid Crediantials");
            }
        })
    }else{
        res.status(404).send("singup first");
    }

    } catch (error) {
        res.status(500).send({"Error":error.message});
    }
})
module.exports={user};