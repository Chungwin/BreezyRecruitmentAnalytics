const express = require('express')
const chalk = require('chalk')

const getPositions = require('./positions/getPositions')

// --------------------------

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())


function updatePositions() {
    getPositions()
    console.log(chalk.green('Last update: ' + new Date()));
}


updatePositions()
setInterval(updatePositions, 1000 * 60 * 60 * 24)


app.listen(port, () => {
    console.log(`POSITIONS is running on port ${port}`);
})