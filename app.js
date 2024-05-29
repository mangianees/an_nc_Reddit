const express = require('express')
const {getTopics} = require('./Controllers/topics.controllers')
const {getApi} = require('./Controllers/api.controllers')
const {getArticles} = require('./Controllers/articles.controllers')
const app = express();

app.use(express.json())
app.get('/api/topics',getTopics)
app.get('/api',getApi)
app.get('/api/articles/:article_id',getArticles)
app.get('/api/articles/',getArticles)


app.use((err,req,res,next)=>{
    if(err.status && err.msg){
        res.status(err.status).send(err.msg);
    }else{
        next(err);
    }
})
// app.listen(9090,()=>{
//     console.log('App is listening on 9090');
// })

module.exports = app;

