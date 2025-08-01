const mysql = require('mysql')
const database = require('../config/database')

const incomeTable = `
CREATE TABLE IF NOT EXISTS incomeTable (
    incomeID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL DEFAULT 'Income', -- Default value set to 'Income'
    amount DECIMAL(10, 2) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES registeredusers(id) ON DELETE CASCADE
);
`

module.exports = incomeTable;