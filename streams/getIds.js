const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')

// ---------------------------------

const getIds = async () => {

    //Creat Connection
    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
    })

    
    var ids = await new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM breezySQL.candidates'
        db.query(sql, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })

    db.end()

    return ids
}

module.exports = getIds