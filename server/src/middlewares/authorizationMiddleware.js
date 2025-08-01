const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const database = require('../config/database')


const authorizationMiddleware = expressAsyncHandler((req,res,next)=>{
    let token
    
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req?.headers?.authorization.split(' ')[1]
        console.log("Authorization is being done.........",token)
        try {
            if(token){
                const decodedUser = jwt.verify(token,process.env.JWT_Token)
                console.log("decodedUser : ",decodedUser)
                // req.user = decodedUser
                const findUserquery = `select * from registeredusers where id = ?;`
                database.query(findUserquery,[decodedUser.id],(error,results)=>{
                    if(error){
                        console.log("The error in finding the User by ID is : ",error)
                        res.status(404).send("An error occured while finding the User using the ID......")
                    }
                    else if(results.length === 0){
                        res.status(200).send("No User found with the given ID")
                    }
                    else{
                        req.user = results[0]
                        // res.status(200).json({"message":"User found with given ID",data:results})
                    }
                }) 

                next()
            }
        } catch (error) {
            console.error("JWT Verification Failed:", error.message);
            return res.status(401).json({ message: "Not authorized.... Token expired!!!!" });          
        }
    }
    else {
        return res.status(401).json({ message: "No token provided" });
    }
})

module.exports = authorizationMiddleware





