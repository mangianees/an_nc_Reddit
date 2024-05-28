const {fetchApi} = require('../Models/api.models')

exports.getApi=(req,res)=>{
    fetchApi()
    .then((result)=>{
        res.json(JSON.parse(result));
    })
}