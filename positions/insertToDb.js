const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')
const logger = require('../winston/logger')

// --------------------------

const insertToDb = async (responseJson) => {

    try {
        const db = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD, 
            database: DATABASE 
        })

        var db_position_ids = await new Promise((resolve, reject) => {

            let sql = 'SELECT * FROM breezySQL.positions'
            db.query(sql, (err, result) => {
                if(err) {
                    reject(err);
                }

                var ids = result.map(db_position => { return db_position.position_id})
                resolve(ids)
            })

        })

    
        for (var obj of responseJson) {

            if (db_position_ids.includes(obj._id)) {
                continue
            } else {
                let post = {position_id: `${obj._id}`, position_state: `${obj.state}`, position_name: `${obj.name}`, department: `${obj.department}`}
                let sql = 'INSERT INTO breezySQL.positions SET ?'
                db.query(sql, post, (err, result) => {
                if(err) console.log(err)
                
                })
            }
        }

        db.end()

    } catch(e) {
        console.log(e);
    }

}

module.exports = insertToDb




