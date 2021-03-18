const fs = require('fs')
const path = require('path')

const request_promise = require('request-promise')
const mysql = require('mysql')
const dateFormat = require('dateformat')
const chalk = require('chalk')
const logger = require('../winston/logger')
const { AUTH_TOKEN, COMPANY_ID } = require('../config')

const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')
const insertStreamToDb = require('./insertStreamToDb')

// ---------------------------------


const getStreams = async (ids) => {

    try {
        const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE
        })

        var db_stream_candidate_ids = await new Promise((resolve, reject) => {
            let sql = 'SELECT candidate_id FROM stream'
            db.query(sql, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        db.end()

        var stream_candidate_ids = db_stream_candidate_ids.map(obj => { return obj.candidate_id })
        let thirty_days_ago = new Date().getTime() - 1000 * 60 * 60 * 24 * 30

        var skip_counter = 0
        
        for (var i = 0; i < ids.length; i++) {

            try {
                let update_date_format = ids[i].update_date
                let update_date = Date.parse(update_date_format)
    
                if(stream_candidate_ids.includes(ids[i].candidate_id) && (update_date < thirty_days_ago)) {
                    skip_counter = skip_counter + 1
                    continue
                } else {
                    var response = await request_promise({ url: `https://api.breezy.hr/v3/company/${COMPANY_ID}/position/${ids[i].position_id}/candidate/${ids[i].candidate_id}/stream`, headers: {'Authorization': AUTH_TOKEN} })
                    var responseJson = JSON.parse(response) 
                    var candidateStream = new Object
                    candidateStream = responseJson
        
                    for (var action of candidateStream) {
                        action.candidate_id = ids[i].candidate_id
                        action.meta_id = ids[i].candidate_meta_id
                        action.origin = ids[i].origin
                        action.source = ids[i].source
                        action.position_name = ids[i].position_name
                        action.position_id = ids[i].position_id
                        action.position_state = ids[i].position_state
                        action.stage = ids[i].latest_stage
                        action.creation_date = ids[i].creation_date
                    }
                    insertStreamToDb(candidateStream) 
                    
                }
                console.log(`${chalk.green(i)} of ${chalk.grey(ids.length)}  /  candidate stream updated  /  ${ids[i].position_name}`)

            } catch(e) {

                var scriptName = path.basename(__filename)
                logger.info(scriptName, e)

                var now = new Date()
                var timestamp = dateFormat(now, 'isoDateTime')
                console.log(chalk.bgRed(`Error File written at ${timestamp}`))

                continue
            }
        }

        console.log(`Candidates skipped: ${skip_counter}`);
    
        
    } catch (e) {
        console.log(e);
    }


}

module.exports = getStreams
