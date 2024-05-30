const db = require('../db/connection')

exports.fetchUsers=()=>{
    try {
        let sqlQuery=`select * from USERS;`;
        return db.query(sqlQuery)
    } catch (err) {
        return err;
    }
}