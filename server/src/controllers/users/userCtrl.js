const bcrypt = require("bcrypt");
const generateToken = require("../../middlewares/generateToken");
const mysql = require("mysql");
const database = require("../../config/database"); // Ensure your database connection is set up properly
const expressAsyncHandler = require("express-async-handler");

// User Registration
const registerUser = expressAsyncHandler((req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  const query = `SELECT * FROM registeredusers WHERE email = ? OR mobile = ?`;
  database.query(query, [email, mobile], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send("Server error"); // Return to prevent further execution
    }

    if (results.length > 0) {
      const existingUser = results[0];
      if (
        existingUser.firstName === firstName &&
        existingUser.lastName === lastName
      ) {
        // console.log("You are already registered.")
        return res.status(200).send("You are already registered......"); // Return to prevent further execution
      } else {
        if (existingUser.email === email)
          return res
            .status(200)
            .send("Email already exists with different user details......"); // Return to prevent further execution
        if (existingUser.mobile === mobile)
          return res
            .status(200)
            .send(
              "Mobile number already exists with different user details......"
            );
      }
    }

    // If no duplicate found, proceed with registration
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error hashing password:", error);
        return res.status(200).send("Error during registration...."); // Return to prevent further execution
      }

      const insertQuery = `INSERT INTO registeredusers (firstName, lastName, mobile, email, password) VALUES (?, ?, ?, ?, ?)`;
      database.query(
        insertQuery,
        [firstName, lastName, mobile, email, hashedPassword],
        (error) => {
          if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).send("Error during registration...."); // Return to prevent further execution
          }

          console.log("Registration Successful!!!!!");
          res.status(200).send("Registration Successful!!!!");
        }
      );
    });
  });
});

// User Login
const loginUser = expressAsyncHandler((req, res) => {
  const { userCreds, password } = req.body; // userCreds is either mobile number or email
  const query = `SELECT * FROM registeredusers WHERE email = ? OR mobile = ?`;
  database.query(query, [userCreds, userCreds], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send("Server error"); // Return to prevent further execution
    }

    if (results.length === 0) {
      // No user found with the given identifier
      return res
        .status(200)
        .send("Either email or mobile number is wrong!!!! Try again.....");
    }

    if (results.length > 0) {
      const existingUser = results[0];
      const hashedPassword = existingUser.password;
      bcrypt.compare(password, hashedPassword, (error, isMatch) => {
        if (error) {
          console.error("Error comparing passwords:", error);
          return res.status(200).send("Error during login.....");
        }

        if (!isMatch) {
          // Password does not match
          return res.status(200).send("Password Incorrect!!! Try Again....");
        }

        // Password matches - login successful
        if (existingUser.isAdmin === 0) {
          checkAdmin = false;
        } else {
          checkAdmin = true;
        }
        console.log("Login successful for user:", userCreds);
        res.status(200).json({
          message: "Login successfull!!!",
          existingUser: {
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            mobile: existingUser.mobile,
            isAdmin: checkAdmin,
            token: generateToken(existingUser.id),
            created_at: existingUser.created_at,
            updated_at: existingUser.updated_at,
          },
        });
      });
    }
  });
});

const fetchUsers = expressAsyncHandler((req, res) => {
  try {
    const query = "SELECT * FROM registeredusers";
    database.query(query, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).send("Server error"); // Return to prevent further execution
      }
      // Send only one response with a JSON object
      res.json({ message: "The list of users are:", users: results });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// fetch user by id
const getUserById = expressAsyncHandler((req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT id, firstName, lastName, email, mobile, isAdmin, created_at FROM registeredusers WHERE id = ?";

  database.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(results[0]); // Send user details
  });
});

module.exports = { registerUser, fetchUsers, loginUser, getUserById };
