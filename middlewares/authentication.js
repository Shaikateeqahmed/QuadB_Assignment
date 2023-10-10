const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;
    jwt.verify(token,process.env.key,(err,decode)=>{
        if(err){
            res.send("U are not Authorized");
        }else{
            let userID = decode.userID;
            req.body.UserID=userID;
            let UserCreatedAt = decode.UserCreatedAt;
            req.body.UserCreatedAt=UserCreatedAt;
            let LastLogin = decode.UserLastLogin;
            req.body.LastLogin = LastLogin;
            next();
        }
    })
}

module.exports={authenticate};