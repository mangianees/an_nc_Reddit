const {fetchUsers} = require('../Models/users.models')

exports.getUsers=(req,res,next)=>{
    try {
        
        fetchUsers().then((users)=>{
            res.status(200).send(users.rows);
        })
        
    } catch (err) {
        next(err)
    }
}