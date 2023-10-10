const {sequelize,DataTypes} = require("../config/connection.js");


const ProfileModel = sequelize.define("Profiles",{
    user_name:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    user_email:{
        type : DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    user_password:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    user_image:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    total_orders:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type : DataTypes.STRING,
        allowNull:false,
    },
    last_logged_in:{
        type : DataTypes.STRING,
        allowNull:false,
    },
})

module.exports={ProfileModel};