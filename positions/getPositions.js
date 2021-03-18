const fs = require('fs')
const path = require('path')

const request_promise = require('request-promise')
const chalk = require('chalk')
const dateFormat = require('dateformat')
const logger = require('../winston/logger')

const insertToDb = require('./insertToDb')
const { AUTH_TOKEN, COMPANY_ID } = require('../config')

// --------------------------

const getPositions = async () => {

    var states = ['published', 'closed']

    for (var state of states) {

        try {
            var response = await request_promise({ url: `https://api.breezy.hr/v3/company/${COMPANY_ID}/positions?state=${state}`, headers: {'Authorization': AUTH_TOKEN} })
            var responseJson = JSON.parse(response)

            insertToDb(responseJson)
            console.log(`DB updated with ${state} positions`)
            
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

module.exports = getPositions
