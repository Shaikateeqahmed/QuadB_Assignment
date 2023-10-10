const express = require("express");
const {user} = require("./routes/userroute.js");
const { authenticate } = require("./middlewares/authentication.js");
const { profile } = require("./routes/profileroute.js");
require("dotenv").config();


const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("HOME PAGE");
})

app.use("/user",user);
app.use(authenticate);
app.use("/profile",profile);

app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`);
})