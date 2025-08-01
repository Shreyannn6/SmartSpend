const expressAsyncHandler = require('express-async-handler')
const Income = require('../../model/Income')
const userCtrl = require('../../controllers/users/userCtrl')
const mysql = require('mysql')
const database = require('../../config/database')
 
//To insert income and its details in the table 
const createIncome = expressAsyncHandler((req, res) => {
    const { title, description, amount, created_by } = req.body;

    // Check for missing fields
    if (!title || !description || !amount || !created_by) {
        return res.status(400).json({
            message: `Missing required fields: ${
                !title ? "title, " : ""
            }${!description ? "description, " : ""}${
                !amount ? "amount, " : ""
            }${!created_by ? "created_by" : ""}`.replace(/, $/, ""), // Removes trailing comma
        });
    }

    const insertquery = `
        INSERT INTO incomeTable (title, description, amount, created_by) 
        VALUES (?, ?, ?, ?)
    `;

    database.query(
        insertquery,
        [title, description, amount, created_by],
        (error) => {
            if (error) {
                console.error("The Error is:", error);
                return res.status(500).send("Error occurred while registering income.");
            }

            res.status(200).json({
                message: "Income has been successfully registered.",
                // income: {
                //     title: title,
                //     description: description,
                //     type: type,
                //     amount: amount,
                //     created_by: created_by,
                // },
            });
        }
    );
});


//To fetch all incomes and its details in the table
const fetchAllIncome = expressAsyncHandler((req,res)=>{
    console.log(req.headers)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const fetchAllIncomequery = 
    `SELECT 
    incomeTable.incomeID, 
    incomeTable.title, 
    incomeTable.description, 
    incomeTable.type, 
    incomeTable.amount, 
    incomeTable.created_by, 
    incomeTable.created_at, 
    incomeTable.updated_at,
    registeredusers.firstName AS creator_firstName,
    registeredusers.lastName AS creator_lastName,
    registeredusers.email AS creator_email,
    registeredusers.mobile AS creator_mobile
FROM incomeTable
JOIN registeredusers ON incomeTable.created_by = registeredusers.id
LIMIT ? OFFSET ?;
`;

    database.query(fetchAllIncomequery,[limit,offset],(error,results)=>{
        if(error){
            console.log(`The error occured during fetching all incomes is : ${error}`)
            res.status(404).send("An error occured during fetching all incomes........")
        }
        if(results.length === 0){
            res.status(200).send("There is no registered income.........")
        }
        else{
            res.status(200).json({
                message: "List of retrieved data",
                data: results,
                page,
                limit
            });
            
        }
    })
    
})

// To fetch all incomes and its details in the table by the creator's ID
const fetchIncomeByCreatorID = expressAsyncHandler((req,res)=>{
    const{creatorID} = req?.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const fetchIncomeByCreatorquery = 
            `SELECT 
            incomeTable.incomeID, 
            incomeTable.title, 
            incomeTable.description, 
            incomeTable.type, 
            incomeTable.amount, 
            incomeTable.created_by, 
            incomeTable.created_at, 
            incomeTable.updated_at,
            registeredusers.firstName AS creator_firstName,
            registeredusers.lastName AS creator_lastName,
            registeredusers.email AS creator_email,
            registeredusers.mobile AS creator_mobile
        FROM incomeTable
        JOIN registeredusers ON incomeTable.created_by = registeredusers.id
        WHERE incomeTable.created_by = ?
        LIMIT ? OFFSET ?;
    `;
    database.query(fetchIncomeByCreatorquery,[creatorID,limit,offset],(error,results)=>{
        if(error){
            console.log("The error is : ",error)
            res.status(400).send("Error occured while fetching incomes and its details in the table by the creator's ID....")
        }
        if( results.length>0){
            console.log(creatorID)
            res.status(200).json({
                message: "Incomes fetched successfully",
                data: results,
                page,
                limit
            })
        }else {
            res.status(404).json({
                message: "No incomes found for the specified creator ID."
            });
        }
    })
})

//To update specific incomes of a specific creator
const updateIncome = expressAsyncHandler((req,res)=>{
    const { creatorID, incomeID } = req.params;
    const { title, description,amount } = req.body;

    // if (!title || !description || !amount) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    const updatequery = `
            UPDATE incomeTable
            SET title = ?, description = ?, amount = ?
            WHERE incomeID = ? AND created_by = ?;
        `;

        database.query(updatequery, [title, description, amount, incomeID, creatorID], (err, result) => {
            if (err) {
                console.error('Error updating income:', err);
                return res.status(500).json({ message: 'Error updating income' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Income not found or not authorized to update' });
            }

            res.status(200).json({ message: 'Income updated successfully' });
        });
    
})

//Delete income by creatorID and incomeID
const deleteIncome = expressAsyncHandler((req, res) => {
    const { creatorID, incomeID } = req.params;

    // Validate required parameters
    if (!incomeID || !creatorID) {
        return res.status(400).json({ message: 'incomeID and creatorID are required' });
    }

    const deleteQuery = `
        DELETE FROM incomeTable
        WHERE incomeID = ? AND created_by = ?;
    `;

    database.query(deleteQuery, [incomeID, creatorID], (err, result) => {
        if (err) {
            console.error('Error deleting income:', err);
            return res.status(500).json({ message: 'Error deleting income' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Income not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    });
});


module.exports = {createIncome,fetchAllIncome,fetchIncomeByCreatorID,updateIncome,deleteIncome};