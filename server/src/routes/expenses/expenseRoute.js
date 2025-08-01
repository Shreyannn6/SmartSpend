const {createExpense,fetchAllExpense,fetchExpenseByCreatorID,updateExpense,deleteExpense}= require('../../controllers/expenses/expenseCtrl')
const express = require('express')
const authorizationMiddleware = require('../../middlewares/authorizationMiddleware') // uSED FOR authorization, i.e, user cannot dobelow actions unless they are logged in
const expenseRoute = express.Router()

expenseRoute.post('/createexpense',authorizationMiddleware,createExpense) //Route for creating expense
expenseRoute.get('/fetchAllExpense',authorizationMiddleware,fetchAllExpense) //Route to fetch all expense from database
expenseRoute.get('/fetchExpenseByCreatorID/:creatorID',authorizationMiddleware,fetchExpenseByCreatorID) //Route to fetch all expense of specific person
expenseRoute.put('/updateExpense/:creatorID/:expenseID',authorizationMiddleware,updateExpense) //Route to update specific expenses of a specific creator
expenseRoute.delete('/deleteExpense/:creatorID/:expenseID',authorizationMiddleware,deleteExpense) //Route to delete specific expenses of a specific creator

module.exports = expenseRoute;
