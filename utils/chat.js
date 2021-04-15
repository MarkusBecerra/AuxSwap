const Pool = require('pg').Pool
const RandExp = require('randexp');

const pool = new Pool({
    user: 'Auxswap',
    host: 'auxswap.cwqgastapcxr.us-east-2.rds.amazonaws.com',
    database: 'auxswap',
    password: 'Hhn167439528',
    port: '5432'
})

// return chat session by yourID and someone's ID
const getSessionByUsers = (req, res, next) => {
    const user1 = String(req.params.user1);
    const user2 = String(req.params.user2);
    pool.query('SELECT session_id FROM chat WHERE user_id = $1 AND \
                session_id IN (SELECT session_id FROM chat WHERE user_id = $2)', [user1, user2], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}




const getUsersBySession = (req, res, next) => {
    const session = String(req.params.session_id);

    pool.query('SELECT user_id FROM chat WHERE session_id = $1', [session], (error, results) => {
        if (!error) {
            res.status(200).send(results.rows);
        } else {
            res.status(404).send(error.message);
        }
    })
}





// make chat single session
const createSession = (req, res, next) => {
    const { userID } = req.body;
    const session = new RandExp(/^[0-9a-zA-Z]{9}$/).gen();
    console.log(session);
    pool.query('INSERT INTO chat (user_id, session_id) VALUES ($1, $2)', [userID, session], (error, results) => {
        if (!error) {
            res.status(200).send(`successfully created session, with ID: ${session}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// make chat two session at the same time
const createTwoSession = (req, res, next) => {
    const { user1, user2 } = req.body;
    const session = new RandExp(/^[0-9a-zA-Z]{9}$/).gen();
    pool.query('INSERT INTO chat (user_id, session_id) VALUES ($1, $3), ($2, $3)', [user1, user2, session], (error, results) => {
        if (!error) {
            res.status(200).send([`successfully created session for user ${user1} and ${user2}, with ID: ${session}`, session]);
        } else {
            res.status(404).send(error.message);
        }
    })
}

// delete session
const deleteSession = (req, res, next) => {
    const session = String(req.params.sessionID);
    pool.query('DELETE FROM chat WHERE session_id = $1', [session], (error, results) => {
        if (!error) {
            res.status(200).send(`successfully deleted the session ${session}`);
        } else {
            res.status(404).send(error.message);
        }
    })
}

module.exports = {
    getSessionByUsers,
    createSession,
    createTwoSession,
    deleteSession,
    getUsersBySession
}