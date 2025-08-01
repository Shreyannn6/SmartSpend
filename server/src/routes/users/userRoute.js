const express = require('express')
const {registerUser,fetchUsers, loginUser,getUserById} = require('../../controllers/users/userCtrl')

const userRoute = express.Router()

userRoute.use(express.json());

userRoute.post('/register', registerUser )
userRoute.get('/fetchusers',fetchUsers)
userRoute.post('/login',loginUser)
userRoute.get('/profile/:id', getUserById);

module.exports = userRoute;