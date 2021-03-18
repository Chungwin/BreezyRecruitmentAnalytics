const mysql = require('mysql')
const chalk = require('chalk')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')

// ---------------------------


const insertCandidatesToDb = (candidates_batch) => {

    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
    })

    var new_counter = 0
    var old_counter = 0

    let sql_ids = 'SELECT candidate_id FROM breezySQL.candidates'
    db.query(sql_ids, (err, result) => {
        if (err) {
            console.log(err);
        }

        let db_candidate_ids = result.map( obj => { return obj.candidate_id })
        let thirty_days_ago = new Date().getTime() - 1000 * 60 * 60 * 24 * 30

        for (var candidate of candidates_batch) {

            let update_date_format = candidate.updated_date
            let update_date = Date.parse(update_date_format)
            
            if (db_candidate_ids.includes(candidate._id) && (update_date < thirty_days_ago)) {
                old_counter = old_counter + 1
                continue

            }  else if (db_candidate_ids.includes(candidate._id) && (update_date > thirty_days_ago)) {
                
                if (candidate.source === undefined || candidate.source === null) {
                    let update_sql = `UPDATE breezySQL.candidates SET ? WHERE candidate_id = '${candidate._id}'`
                    let post = {candidate_id: `${candidate._id}`, candidate_meta_id: `${candidate.meta_id}`, origin: `${candidate.origin}`, source: 'undefined', position_name: `${candidate.position_name}`, position_id: `${candidate.position_id}`, position_state: `${candidate.position_state}`, latest_stage: `${candidate.stage.name}`, creation_date: `${candidate.creation_date}`, update_date: `${candidate.updated_date}`}
                    db.query(update_sql, post, (err, result) => {
                        if(err) {
                            console.log(err);
                        }      
    
                    })
                    new_counter = new_counter + 1 

                } else {
                    let update_sql = `UPDATE breezySQL.candidates SET ? WHERE candidate_id = '${candidate._id}'`
                    let post = {candidate_id: `${candidate._id}`, candidate_meta_id: `${candidate.meta_id}`, origin: `${candidate.origin}`, source: `${candidate.source.name}`, position_name: `${candidate.position_name}`, position_id: `${candidate.position_id}`, position_state: `${candidate.position_state}`, latest_stage: `${candidate.stage.name}`, creation_date: `${candidate.creation_date}`, update_date: `${candidate.updated_date}`}
                    db.query(update_sql, post, (err, result) => {
                        if(err) {
                            console.log(err);
                        } 
    
                        
                    })
                    new_counter = new_counter + 1
                }

            } else if (candidate.source === undefined || candidate.source === null) {
                let sql = 'INSERT INTO breezySQL.candidates SET ?' 
                let post = {candidate_id: `${candidate._id}`, candidate_meta_id: `${candidate.meta_id}`, origin: `${candidate.origin}`, source: 'undefined', position_name: `${candidate.position_name}`, position_id: `${candidate.position_id}`, position_state: `${candidate.position_state}`, latest_stage: `${candidate.stage.name}`, creation_date: `${candidate.creation_date}`, update_date: `${candidate.updated_date}`}
                db.query(sql, post, (err, result) => {
                    if(err) {
                        console.log(err);
                    }

            
                })
                new_counter = new_counter + 1  

            } else {
                let sql = 'INSERT INTO breezySQL.candidates SET ?' 
                let post = {candidate_id: `${candidate._id}`, candidate_meta_id: `${candidate.meta_id}`, origin: `${candidate.origin}`, source: `${candidate.source.name}`, position_name: `${candidate.position_name}`, position_id: `${candidate.position_id}`, position_state: `${candidate.position_state}`, latest_stage: `${candidate.stage.name}`, creation_date: `${candidate.creation_date}`, update_date: `${candidate.updated_date}`}
                db.query(sql, post, (err, result) => {
                    if(err) {
                        console.log(err);
                    } 

                    
                })
                new_counter = new_counter + 1
            }
        }
       
        
        console.log(`Candidates updated within 30 day: ${chalk.green(new_counter)}`)
        console.log(`No updates within 30 days: ${chalk.blue(old_counter)}`)
        console.log(" ");
        
        db.end()
    })

    
}

module.exports = insertCandidatesToDb