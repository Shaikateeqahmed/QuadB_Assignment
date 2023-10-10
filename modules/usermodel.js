const {sequelize,DataTypes} = require("../config/connection.js");


const UserModel = sequelize.define("users",{
    email:{
        type : DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    date :{
        type : DataTypes.STRING
    }
})

module.exports={UserModel};