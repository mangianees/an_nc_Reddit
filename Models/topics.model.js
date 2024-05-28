const db = require('../db/connection')

exports.fetchTopics=(()=>{
return db.query(`SELECT slug,description FROM TOPICS;`)
    .then((result)=>{
        return result.rows;
})
})