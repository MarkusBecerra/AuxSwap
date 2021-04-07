const Pool = require('pg').Pool

const pool = new Pool({
    user: 'Auxswap',
    host: 'auxswap.cwqgastapcxr.us-east-2.rds.amazonaws.com',
    database: 'auxswap',
    password: 'Hhn167439528',
    port: '5432'
})

// Get Message from a specific session
const getMessageBySession = (req, res, next) => {
    const sessionId = String(req.params.session);
    pool.query('SELECT sender_id, content FROM messages WHERE session_id = $1', [sessionId], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Get Message from a specific session and specific people
const getMessageByUserAndSession = (req, res, next) => {
    const sessionId = String(req.params.session);
    const userID = String(req.params.user);
    pool.query('SELECT sender_id, content FROM messages WHERE session_id = $1 AND sender_id = $2', [sessionId, userID], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Add Message by session_id and user_id
const addMessage = (req, res, next) => {
    const { session, userID, content } = req.body;
    pool.query('INSERT INTO messages (session_id, sender_id, content) VALUES ($1, $2, $3)',
                 [session, userID, content], (error, results) => {
        if (!error) {
            res.status(201).send(`Message has been added to the session_id: ${session}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// Clear Message history by session
const deleteMessage = (req, res, next) => {
    const session = req.params.session;
    pool.query('DELETE FROM messages WHERE session_id = $1',
                 [session], (error, results) => {
        if (!error) {
            res.status(201).send(`Message in session: ${session} has been deleted`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

module.exports = {
    getMessageBySession,
    getMessageByUserAndSession,
    addMessage,
    deleteMessage
}