const express = require('express')

const {getTopics} = require('./Controllers/topics.controllers')

const {getApi} = require('./Controllers/api.controllers')

const app = express();

app.use(express.json())

app.get('/api/topics',getTopics)

app.get('/api',getApi)

module.exports = app;

