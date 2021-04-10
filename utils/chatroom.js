// ! This file is used for self chatting, not for one-to-one chatting
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'Auxswap',
    host: 'auxswap.cwqgastapcxr.us-east-2.rds.amazonaws.com',
    database: 'auxswap',
    password: 'Hhn167439528',
    port: '5432'
})

const getChatById = (req, res, next) => {
    const chatroomId = Number(req.params.id);
    pool.query('SELECT content FROM demochat WHERE id = $1', [chatroomId], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

const addChatMessage = (req, res, next) => {
    const { id, content } = req.body;
    pool.query('INSERT INTO demochat (id, content) VALUES ($1, $2)',
                 [id, content], (error, results) => {
        if (!error) {
            res.status(201).send(`Message has been added, with session_id: ${id}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}
// Clear Message history

module.exports = {
    getChatById,
    addChatMessage
}