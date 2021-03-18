const express = require('express')
const chalk = require('chalk')
const getIds = require('./streams/getIds')
const getStreams = require('./streams/getStreams')

// ---------------------------------

const app = express()
const port = process.env.PORT || 4002
app.use(express.json())


async function updateStream() {
    var start = new Date()
    var ids = await getIds()
    await getStreams(ids)
    var end = new Date()

    console.log(`Start: ${chalk.bgGreen(start)}`)
    console.log(`End: ${chalk.bgBlack(end)}`);
}

updateStream()
setInterval(updateStream, 1000 * 60 * 60 * 2)


app.listen(port, () => {
    console.log(`STREAM is running on port ${port}`);
})

