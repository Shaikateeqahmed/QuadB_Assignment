const {Sequelize,DataTypes} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DBname,process.env.User,process.env.password,{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>console.log("connection successfull")).catch((err)=>console.log(err));





module.exports={sequelize,DataTypes};