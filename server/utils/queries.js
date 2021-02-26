const Pool = require('pg').Pool

const pool = new Pool({
    user: 'Auxswap',
    host: 'auxswap.cwqgastapcxr.us-east-2.rds.amazonaws.com',
    database: 'auxswap',
    password: 'Hhn167439528',
    port: '5432'
})

// Get all user info
const getUser = (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (!error) {
            res.status(200).json(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Get a single user by ID
const getUserById = (req, res, next) => {
    const userId = Number(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if (!error) {
            res.status(200).json(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Add new User
const addUser = (req, res, next) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name, email) VALUE ($1, $2)', [name, email], (error, results) => {
        if (!error) {
            res.status(201).send(`User has been added, with ID: ${results.insertId}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Update an existing User
const updateUser = (req, res, next) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    pool.query('UPDATE users SET name = $1, email = $2 id = $3', [name, email, userId],
     (error, results) => {
        if (!error) {
            res.status(200).send(`User has been updated, with ID: ${userId}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Remove a user
const removeUser = (req, res, next) => {
    const userId = Number(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [userId], (error, results) => {
        if (!error) {
            res.status(200).send(`User has been deleted, with ID: ${userId}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

module.exports = {
    getUser,
    getUserById,
    addUser,
    updateUser,
    removeUser
}