const mysql = require('mysql')
const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = require('../config')

// --------------------------

const insertToDb = (responseJson) => {

    //Creat Connection
    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD, 
        database: DATABASE 
    })


    class Position {
        constructor(position_id, position_state, position_name, department = null) {
            this.position_id = position_id
            this.position_state = position_state
            this.position_name = position_name
            this.department = department
        }
    }


    for (var obj of responseJson) {
  
        var position = new Position (obj._id, obj.state, obj.name, obj.department)

        // Check if already exists
        let sql = 'SELECT * FROM breezySQL.positions'
        db.query(sql, (err, result) => {
            if(err) console.log(err) 
            
            var ids = result.map(db_position => { return db_position.position_id })
            if (ids.includes(position.position_id)) {
                return
                
            } else {
                // Insert new positions
                let post = position
                let sql = 'INSERT INTO breezySQL.positions SET ?'
                db.query(sql, post, (err, result) => {
                    if(err) console.log(err)
                    
                })
            }
        
            
        }) 

        
    } 

    db.end()
}

module.exports = insertToDb




