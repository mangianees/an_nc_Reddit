const {fetchTopics} = require('../Models/topics.model')

exports.getTopics=(req,res)=>{

    fetchTopics().then((result)=>{
        res.status(200).send(result)
    })
}