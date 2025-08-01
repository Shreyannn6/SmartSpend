const mysql = require('mysql2')
const database = require('../../config/database')
const expense= require('../../model/Expense')
const expressAsyncHandler = require('express-async-handler')

// To insert an expenseand its details into database
const createExpense = expressAsyncHandler((req,res)=>{
    const {title, description,amount,created_by} = req.body
    
    const insertquery = `insert into expenseTable (title, description,amount,created_by) values (?,?,?,?);`

    database.query(insertquery,[title, description,amount,created_by],(error,results)=>{
        if(error){
            console.log(`The error occured is : ${error}`)
            res.status(404).send("Error occured...............")
        }
        res.status(200).send("Expense has been registered successfully......")
    })
})

// To fetch all the expenses from the table
const fetchAllExpense = expressAsyncHandler((req,res)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    
    const fetchAllExpensequery = `SELECT 
    expenseTable.expenseID, 
    expenseTable.title, 
    expenseTable.description, 
    expenseTable.type, 
    expenseTable.amount, 
    expenseTable.created_by, 
    expenseTable.created_at, 
    expenseTable.updated_at,
    registeredusers.firstName AS creator_firstName,
    registeredusers.lastName AS creator_lastName,
    registeredusers.email AS creator_email,
    registeredusers.mobile AS creator_mobile
FROM expenseTable
JOIN registeredusers ON expenseTable.created_by = registeredusers.id
LIMIT ? OFFSET ?;
`;
    database.query(fetchAllExpensequery,[limit,offset],(error,results)=>{
        if(error){
            console.log(`The error is : ${error}`)
            res.status(404).send("Error occured.........")
        }
        if(results.length === 0){
            return res.status(200).send("There is no registered expense........")
            // res.status(200).json({
            //     message: "There is no registered expense........",
            //     data: [],
            //     page,
            //     limit
            // });
        }
        return res.status(200).json({
            message: "List of retrieved data",
            data: results,
            page,
            limit
        });
    })

})

// To fetch all expenses and its details in the table by the creator's ID
const fetchExpenseByCreatorID = expressAsyncHandler((req, res) => {
    const { creatorID } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fixed SQL Query
    const fetchExpenseByCreatorQuery = `
        SELECT 
            expenseTable.expenseID, 
            expenseTable.title, 
            expenseTable.description, 
            expenseTable.type, 
            expenseTable.amount, 
            expenseTable.created_by, 
            expenseTable.created_at, 
            expenseTable.updated_at,
            registeredusers.firstName AS creator_firstName,
            registeredusers.lastName AS creator_lastName,
            registeredusers.email AS creator_email,
            registeredusers.mobile AS creator_mobile
        FROM expenseTable
        JOIN registeredusers ON expenseTable.created_by = registeredusers.id
        WHERE expenseTable.created_by = ?
        LIMIT ? OFFSET ?;
    `;

    database.query(fetchExpenseByCreatorQuery, [creatorID, limit, offset], (error, results) => {
        if (error) {
            console.error("Error fetching expenses by creator ID:", error);
            return res.status(500).json({ message: "Error occurred while fetching expenses by creator ID." });
        }

        if ( results.length > 0) {
            return res.status(200).json({
                message: "Expenses fetched successfully",
                data: results,
                page,
                limit
            });
        } else {
            return res.status(404).json({
                message: "No expenses found for the specified creator ID."
            });
        }
    });
});

// To update specific expenses of a specific creator
const updateExpense = expressAsyncHandler((req,res)=>{
    const {creatorID,expenseID} = req.params
    const { title, description,amount } = req.body;

    const updateExpensequery = `UPDATE expenseTable
            SET title = ?, description = ?, amount = ?
            WHERE expenseID = ? AND created_by = ?;`

    database.query(updateExpensequery,[title,description,amount,expenseID,creatorID],(error,results)=>{
        if(error){
            console.log(`The error is : ${error}`)
            res.status(404).send("Error occured.........")
        }
        if(results.affectedRows>0){
            res.status(200).send('Expense updated successfully!!!')
        }
        else{
            res.status(404).send("No expenses with given expenseID found for the specified creator ID.......")
        }
    })        
})

//To delete specific expenses of a specific creator
const deleteExpense = expressAsyncHandler((req,res)=>{
    const {creatorID,expenseID} = req.params

    const deletExpensequery = `delete from expenseTable where expenseID = ? and created_by = ?;`

    database.query(deletExpensequery,[expenseID,creatorID],(error,results)=>{
        if(error){
            console.log(`The error is : ${error}`)
            res.status(404).send("Error occured.........")
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Income not found or not authorized to delete');
        }

        res.status(200).send('Income deleted successfully');
    })

}) 

module.exports = {createExpense,fetchAllExpense,fetchExpenseByCreatorID,updateExpense,deleteExpense}
