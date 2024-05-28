const express = require('express')

const {getTopics} = require('./Controllers/topics.controllers')

const {getApi} = require('./Controllers/api.controllers')

const {getArticles} = require('./Controllers/articles.controllers')
const app = express();

app.use(express.json())

app.get('/api/topics',getTopics)

app.get('/api',getApi)

app.get('/api/articles/:article_id',getArticles)

// app.listen(9090,()=>{
//     console.log('App is listening on 9090');
// })

module.exports = app;

