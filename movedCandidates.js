
const mysql = require('mysql')
const chalk = require('chalk')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('./config')


// breezySQL.stream       
    // If error: candidate not on requested position
        // Get meta_id and position of candidate (new batch)

        // breezySQL.candidates
        // Go to DB, look for meta_id. Get old position.
        
        // add to DB "Moved from <old_position> to <new_position>"
        
// When run candidates.js, candidate in old position is captured and candidate in new position is captured. Both entres marked with "moved"

// Go to breezySQL.candidates, look where one candidate_meta_id has multiple entries --> moved candidates.


const movedCandidates = (candidates_batch) => {

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
        let six_months = new Date().getTime() - 1000 * 60 * 60 * 24 * 180

        for (var candidate of candidates_batch) {

            let creation_date_format = candidate.creation_date
            let creation_date = Date.parse(creation_date_format)

            if (!db_candidate_ids.includes(candidate._id) && (creation_date > six_months)) {
                //NEW position of candidate
                console.log(candidate);


            } else {
                continue
            }
        }
        db.end()
    })

}

module.exports = movedCandidates