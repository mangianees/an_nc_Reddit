const db = require('../db/connection')

exports.fetchArticles=((articleId)=>{
let sqlQuery= `select 
author,
title,
article_id,
body,
topic,
created_at,
votes,
article_img_url from ARTICLES
`
const queryValues=[];

if(articleId){
    sqlQuery += `WHERE article_id = $1`;
    queryValues.push(articleId);
}

sqlQuery += `;`;
return db.query(sqlQuery,queryValues)
    .then((result)=>{
        return result.rows;
})
})