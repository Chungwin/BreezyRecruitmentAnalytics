const chalk = require('chalk')
const getPositions = require('./positions/getPositions')

// --------------------------

function updatePositions() {
    getPositions()
    console.log(chalk.green('Last update: ' + new Date()));
}


updatePositions()
setInterval(updatePositions, 1000 * 60 * 60 * 24)
