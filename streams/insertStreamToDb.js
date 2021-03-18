const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')


const insertStreamToDb = (candidateStream) => {

    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
    })


    class CandidateStream {
        constructor(candidate_id, candidate_meta_id, origin = null, source = null, position_name, position_id, position_state, stage, creation_date, action_type, acting_user = null, timestamp, new_stage = null, previous_stage = null, entered_previous_stage = null) {
           this.candidate_id = candidate_id
           this.candidate_meta_id = candidate_meta_id
           this.origin = origin
           this.source = source
           this.position_name = position_name
           this.position_id = position_id
           this.position_state = position_state
           this.stage = stage
           this.creation_date = creation_date
           this.action_type = action_type
           this.acting_user = acting_user
           this.timestamp = timestamp
           this.new_stage = new_stage
           this.previous_stage = previous_stage
           this.entered_previous_stage = entered_previous_stage
        }
    }


    for (var action of candidateStream) {

        if(action.type === "candidateStatusUpdated" && action.object.stage_was != null) {
            // console.log(action.object);
            let post = new CandidateStream (action.candidate_id, action.meta_id, action.origin, action.source, action.position_name, action.position_id, action.position_state, action.stage, action.creation_date, action.type, action.object.acting_user.name, action.timestamp, action.object.stage.name, action.object.stage_was.name, action.object.entered_previous_stage) 
            let sql = 'INSERT INTO breezySQL.stream SET ?'
            db.query(sql, post, (err, result) => {
                if(err) {
                    console.log(err);
                }
            })
            
        } else if (action.type === "candidateStatusUpdated" && action.object.stage_was === null) {
            let post = new CandidateStream (action.candidate_id, action.meta_id, action.origin, action.source, action.position_name, action.position_id, action.position_state, action.stage, action.creation_date, action.type, action.object.acting_user.name, action.timestamp, action.object.stage.name, null, action.object.entered_previous_stage) 
            let sql = 'INSERT INTO breezySQL.stream SET ?'
            db.query(sql, post, (err, result) => {
                if(err) {
                    console.log(err);
                }
            })       


        } else if (action.type === "companyNotePosted"){
            let post = new CandidateStream (action.candidate_id, action.meta_id, action.origin, action.source, action.position_name, action.position_id, action.position_state, action.stage, action.creation_date, action.type, action.object.acting_user.name, action.timestamp) 
            let sql = 'INSERT INTO breezySQL.stream SET ?'
            db.query(sql, post, (err, result) => {
                if(err) {
                    console.log(err);
                }
            }) 
             
                      
        } else if (action.type === "candidateAdded") {
            let post = new CandidateStream (action.candidate_id, action.meta_id, action.origin, action.source, action.position_name, action.position_id, action.position_state, action.stage, action.creation_date, action.type, null, action.timestamp, 'candidate added', null, action.object.entered_previous_stage) 
            let sql = 'INSERT INTO breezySQL.stream SET ?'
            db.query(sql, post, (err, result) => {
                if(err) {
                    console.log(err);
                }
            })
              
            
        } else {
            let post = new CandidateStream (action.candidate_id, action.meta_id, action.origin, action.source, action.position_name, action.position_id, action.position_state, action.stage, action.creation_date, action.type, null, action.timestamp) 
            let sql = 'INSERT INTO breezySQL.stream SET ?'
            db.query(sql, post, (err, result) => {
                if(err) {
                    console.log(err);
                }
            })  
            
        
        }
    }
    
    db.end() 
    
}

module.exports = insertStreamToDb
