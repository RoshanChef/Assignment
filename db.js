const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12780480',
    password: 'pIxPCCWhH5',
    database: 'sql12780480'
});

connection.connect((err) => {
    if (err) {
        return console.error('Error connecting:', err.stack);
    }
    console.log('Connected as id ' + connection.threadId);
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(100),
    latitude FLOAT,
    longtitude FLOAT
)`;

function connect_db() {
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Users table created or already exists.');
        }
    });
}

module.exports = { connection, connect_db }; 