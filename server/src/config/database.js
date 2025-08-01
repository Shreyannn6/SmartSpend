const mysql = require('mysql')
const express = require('express')
require('dotenv').config();
const createTableQuery = require('../model/User')
const incomeTable = require('../model/Income')
const expenseTable = require('../model/Expense')

 const app = express()

const database = mysql.createConnection({
 host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

database.connect((error)=>{
    if(error){
        console.log(`The error occured during database connection is ${error} `)
    }
    else{
        console.log("Database has been connected successfully.......................")
        
        // Connecting table "registeredusers" with the database. 
        database.query(createTableQuery, (err, results) => {
            if (err) {
              console.error('Error creating table:', err);
              return;
            }
            console.log('Table `registeredusers` created or already exists.');
          });

          
          // Connecting table "incomeTable" with the database.
          database.query(incomeTable, (err, results) => {
            if (err) {
              console.error('Error creating table:', err);
              return;
            }
            console.log('Table `incomeTable` created or already exists.');
          });


          // Connecting table "expenseTable" with the database.
          database.query(expenseTable, (err, results) => {
            if (err) {
              console.error('Error creating table:', err);
              return;
            }
            console.log('Table `expenseTable` created or already exists.');
          });

    }
})



module.exports = database;