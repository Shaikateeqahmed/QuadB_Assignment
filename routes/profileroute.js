const express = require("express");
const { sequelize } = require("../config/connection.js");
const { ProfileModel } = require("../modules/profilemodel");
const bcrypt = require("bcrypt");

const profile = express.Router();

//the below endpoint will give us a list of profiles;
profile.get("/", async (req, res) => {
    try {
        let users = await ProfileModel.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }
})


//the below endpoint will give us a details of a particular profile by id;
profile.get("/details/:id", async (req, res) => {
    let ID = req.params.id;
    try {
        let user_by_id = await ProfileModel.findOne({ where: { id: ID } });

        //checking for is user with this id exist or not;
        if (user_by_id) {
            res.status(200).send(user_by_id.dataValues);
        } else {
            res.status(409).send("User with this id doesn't exist!")
        }

    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }
})


//the below endpoint will give us a details of image of a particular profile by id;
profile.get("/image/:id", async (req, res) => {
    let ID = req.params.id;

    try {
        let user_by_id = await ProfileModel.findOne({ where: { id: ID } });

        //checking for is user with this id exist or not;
        if (user_by_id) {
            res.status(200).send(user_by_id.dataValues.user_image);
        } else {
            res.status(409).send("User with this id doesn't exist!")
        }
    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }

})

//the below endpoint will help us to update a particular profile by id;
profile.put("/update/:id", async (req, res) => {
    let { user_name, user_email, user_password, user_image, total_orders, UserCreatedAt, LastLogin } = req.body;
    let ID = req.params.id;

    try {
        let user = await ProfileModel.findOne({ where: { id: ID } });

        //checking for is user with this id exist or not;
        if (user) {
            //checking for the filling of all required fields;
            if (user_name && user_email && user_password && user_image && total_orders) {
                await sequelize.sync();
                //Bcrypt the password for security perpose;
                bcrypt.hash(user_password, 5, async (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        await ProfileModel.update({ user_name, user_email, user_password: hash, user_image, total_orders, created_at: UserCreatedAt, last_logged_in: LastLogin }, { where: { id: ID } });
                        res.status(200).send("Profile Updated Successfully!");
                    }
                })
            } else {
                res.status(400).send("Please fill all the fields!");
            }
        } else {
            res.status(409).send("User with this ID doesn't exist!");
        }

    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }

})

//the below endpoint will help us to create a new profile;
profile.post("/insert", async (req, res) => {
    let { user_name, user_email, user_password, user_image, total_orders, UserCreatedAt, LastLogin } = req.body;

    try {
        //checking for the filling of all required fields;
        if (user_name && user_email && user_password && user_image && total_orders) {
            await sequelize.sync();
            //Bcrypt the password for security perpose;
            bcrypt.hash(user_password, 5, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    await ProfileModel.create({ user_name, user_email, user_password: hash, user_image, total_orders, created_at: UserCreatedAt, last_logged_in: LastLogin });
                    res.status(200).send("Profile Added Successfully!");
                }
            })

        } else {
            res.status(400).send("Please fill all the fields!");
        }
    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }

})

//the below endpoint will help us to delete a particular profile by id;
profile.delete("/delete/:id", async (req, res) => {
    let ID = req.params.id;

    try {
        let user_by_id = await ProfileModel.destroy({ where: { id: ID } });

        //checking for is user with this id exist or not;
        if (user_by_id) {
            res.status(200).send("User deleted successfully!");
        } else {
            res.status(409).send("User with this id doesn't exist!")
        }
    } catch (error) {
        res.status(500).send({ "Error": error.message });
    }

})


module.exports = { profile };