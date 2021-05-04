const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('./config')




const names_and_tags = (candidates_batch) => {

    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
    })

    let sql_ids = 'SELECT candidate_id FROM breezySQL.candidates'
    db.query(sql_ids, (err, result) => {
        if (err) {
            console.log(err);
        }

        let db_candidate_ids = result.map( obj => { return obj.candidate_id })

        for (candidate of candidates_batch) {

            if (db_candidate_ids.includes(candidate._id)) {
                let update_sql = `UPDATE breezySQL.candidates SET ? WHERE candidate_id = '${candidate._id}'`
                let post = {candidate_name: `${candidate.name}`, tags: `${candidate.tags}`}
                db.query(update_sql, post, (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                })

            } else {
                let sql = 'INSERT INTO breezySQL.candidates SET ?' 
                let post = {candidate_name: `${candidate.name}`, tags: `${candidate.tags}`}
                db.query(sql, post, (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        }

        db.end()
        
    })   

    
}

module.exports = names_and_tags