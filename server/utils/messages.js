const Pool = require('pg').Pool

const pool = new Pool({
    user: 'Auxswap',
    host: 'auxswap.cwqgastapcxr.us-east-2.rds.amazonaws.com',
    database: 'auxswap',
    password: 'Hhn167439528',
    port: '5432'
})
// TODO: either keep chat in database of reading txt file from local

// Get Message by session_id
const getMessageById = (req, res, next) => {
    const sessionId = Number(req.params.id);
    pool.query('SELECT * FROM messages WHERE session_id = $1', [sessionId], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Add Message by session_id
const addMessage = (req, res, next) => {
    const { time, sender, receiver, content } = req.body;
    pool.query('INSERT INTO messages (session_id, time, sender, receiver, content) VALUES ($1, $2, $3, $4, $5)',
                 [req.params.id, time, sender, receiver, content], (error, results) => {
        if (!error) {
            res.status(201).send(`Message has been added, with session_id: ${req.params.id}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}
// Clear Message history

module.exports = {
    getMessageById,
    addMessage
}