const fs = require('fs')
const path = require('path')

const request_promise = require('request-promise')
const chalk = require('chalk')
const dateFormat = require('dateformat')
const logger = require('../winston/logger')

const { AUTH_TOKEN, COMPANY_ID } = require('../config')
const insertCandidatesToDb = require('./insertCandidatesToDb')

const movedCandidates = require('../movedCandidates')

// ---------------------------

const getBreezyCandidates = async (position_ids) => {

    for (var position of position_ids) {

        try {
            var response = await request_promise({ url: `https://api.breezy.hr/v3/company/${COMPANY_ID}/position/${position.position_id}/candidates`, headers: {'Authorization': AUTH_TOKEN} })
            var responseJson = JSON.parse(response)
            var candidates_batch = new Object()
            candidates_batch = responseJson
    
            for(var candidate of candidates_batch) {
                candidate.position_name = position.position_name
                candidate.position_id = position.position_id
                candidate.position_state = position.position_state
            }
            
            insertCandidatesToDb(candidates_batch)
            console.log(`${chalk.underline(position.position_name)} inserted to DB  /  ${position_ids.indexOf(position) + 1} of ${position_ids.length}`)
        } catch (e) {

            var scriptName = path.basename(__filename)
            logger.info(scriptName, e)

            var now = new Date()
            var timestamp = dateFormat(now, 'isoDateTime')
            console.log(chalk.bgRed(`Error File written at ${timestamp}`))

            continue
        }
        
    }

}

module.exports = getBreezyCandidates

