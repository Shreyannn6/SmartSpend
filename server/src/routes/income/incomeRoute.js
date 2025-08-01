const express = require('express')
const {createIncome,fetchAllIncome,fetchIncomeByCreatorID,updateIncome,deleteIncome} = require('../../controllers/income/incomeCtrl')
const authorizationMiddleware = require('../../middlewares/authorizationMiddleware') // uSED FOR authorization, i.e, user cannot dobelow actions unless they are logged in
const incomeRoute = express.Router()

incomeRoute.post('/createIncome',authorizationMiddleware,createIncome) //Route for creating income
incomeRoute.get('/fetchAllIncome',authorizationMiddleware,fetchAllIncome) //Route for fetching incomes
incomeRoute.get('/fetchIncomeOf/:creatorID',authorizationMiddleware,fetchIncomeByCreatorID) //Route for fetching incomes by creator's ID
incomeRoute.put("/updateIncomeOf/:creatorID/:incomeID",authorizationMiddleware,updateIncome)//Route for updating incomes by creator's ID and incomeID
incomeRoute.delete("/deleteIncomeOf/:creatorID/:incomeID",authorizationMiddleware,deleteIncome)//Route for updating incomes by creator's ID and incomeID

module.exports = incomeRoute;