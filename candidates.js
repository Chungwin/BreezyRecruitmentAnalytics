const express = require('express')
const queryPositionIds = require('./candidates/queryPositionIds')
const getBreezyCandidates = require('./candidates/getBreezyCandidates')

// ---------------------------

const app = express()
const port = process.env.PORT || 4001
app.use(express.json())


async function getCandidates() {
    var position_ids = await queryPositionIds()
    await getBreezyCandidates(position_ids)
    
    console.log('Last DB update: ' + new Date());
}

getCandidates()
setInterval(getCandidates, 1000 * 60 * 60 * 2)



app.listen(port, () => {
    console.log(`CANDIDATES is running on port ${port}`);
})

