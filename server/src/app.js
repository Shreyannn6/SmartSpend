const express = require('express')
const cors = require("cors")
const userRoute = require('./routes/users/userRoute.js')
const {errorHandler, pageNotFound} = require('./middlewares/errorHandler.js')
const incomeRoute = require('./routes/income/incomeRoute.js')
const expenseRoute = require('./routes/expenses/expenseRoute.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/users',userRoute)

app.use('/income',incomeRoute)



app.use('/expense',expenseRoute)

app.use(pageNotFound)
app.use(errorHandler)


module.exports = app