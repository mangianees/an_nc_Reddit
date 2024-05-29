const db = require('../db/connection')

exports.fetchArticles=((articleId,sort_by)=>{
const validSort_by =['created_at'];

// if(sort_by && !validSort_by.includes(sort_by)){

//     return Promise.reject({status: 400, msg:"Bad Request thiss"});
// }

let sqlQuery= ``; 
const queryValues=[];

    if(!articleId){
        sqlQuery += `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at,
        articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
            FROM articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY articles.article_id `
    }

    // if(sort_by){
    //     sqlQuery += `ORDER BY articles.created_at DESC`

    // }

    if(articleId){
        sqlQuery += `select 
        author,
        title,
        article_id,
        topic,
        created_at,
        votes,
        article_img_url,
        body FROM ARTICLES `
        sqlQuery += `WHERE article_id = $1`;
        queryValues.push(articleId);
    }

sqlQuery += `;`;

// console.log('sqlQuery---<',sqlQuery);
return db.query(sqlQuery,queryValues)
    .then((result)=>{
        return result.rows;
})
})

exports.fetchCommentsByArticleId=((articleId)=>{
    let queryValues =[];
    let sqlQuery = `select * from COMMENTS WHERE article_id=$1 `;

    sqlQuery += `ORDER BY created_at DESC;`;

    queryValues.push(articleId);
    return db.query(sqlQuery,queryValues)
    .then((result)=>{
        return result.rows;
})  
})