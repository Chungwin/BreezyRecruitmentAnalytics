const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')

// ---------------------------

const queryPositionIds = async () => {

    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
    })

    
    var position_ids = await new Promise((resolve, reject) => {
        let sql = 'SELECT position_id, position_name, position_state FROM breezySQL.positions'
        db.query(sql, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })

    db.end()

    return position_ids
    
}

module.exports = queryPositionIds