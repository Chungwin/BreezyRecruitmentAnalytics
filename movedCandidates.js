
const mysql = require('mysql')
const chalk = require('chalk')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('./config')

// breezySQL.candiates
    // if candiateInDb younger than 6 months (GDPR) and NOT in new batch --> "candidate was moved" column in MySQL --> Should not getStream from this position_id
    // if candidateInDB older than 6 months and not in ewn batch --> Normal. (Nothing happens to canidate in DB. Was deleted (GDPR) but want to keep data.) 

// Where to find moved candidate? Other question. #MetaID.


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
                console.log(`Candidate not in DB: ${candidate}`)
            } else {
                console.log('Fine');
            }
        }
        db.end()
    })

}

module.exports = movedCandidates