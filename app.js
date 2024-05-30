const express = require('express')
const {getTopics} = require('./Controllers/topics.controllers')
const {getApi} = require('./Controllers/api.controllers')
const {getArticles,patchArticleById} = require('./Controllers/articles.controllers')
const {getCommentsByArticleId,postCommentOnArticle,deleteCommentById} = require('./Controllers/comments.controller')
const app = express();

app.use(express.json())
app.get('/api/topics',getTopics)
app.get('/api',getApi)
app.get('/api/articles/:article_id',getArticles)
app.get('/api/articles/',getArticles)
app.get('/api/articles/:article_id/comments/',getCommentsByArticleId)

app.post('/api/articles/:article_id/comments',postCommentOnArticle)

app.patch('/api/articles/:article_id',patchArticleById)
app.delete('/api/comments/:comment_id',deleteCommentById)

app.use((err,req,res,next)=>{
    if(err.status && err.msg){
        res.status(err.status).send(err.msg);
    }else{
        next(err);
    }
})

module.exports = app;

