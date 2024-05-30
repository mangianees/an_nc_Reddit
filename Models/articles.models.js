const db = require('../db/connection')

exports.fetchArticles=((articleId)=>{
const validSort_by =['created_at'];

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

sqlQuery += `ORDER BY articles.created_at DESC;`;

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



exports.insertCommentOnArticle= async (username,body,article_id)=>{

    try {
        
        
        let sqlQuery = ``;
        
        sqlQuery += `SELECT * FROM articles WHERE article_id = $1`
        
        
        const {rowCount} = await db.query(sqlQuery,[article_id])

        if(rowCount===0){
            const err = new Error("No Article Found");
            err.status = 404;
            throw err;
        }
        
        sqlQuery = `
            INSERT INTO comments (author, body, article_id)
            VALUES ($1, $2, $3)
            RETURNING comment_id, votes, created_at, author, body, article_id;
          `;
        
          const { rows } = await db.query(sqlQuery, [username, body, article_id]);
          return rows[0];
    } catch (err) {
        return err
    }
}

exports.updateCommentOnArticle = async (username,body,votes,article_id)=>{
    try {
    
        let sqlQuery = ``;
        
        sqlQuery += `SELECT * FROM articles WHERE article_id = $1`
        
        
        const {rowCount} = await db.query(sqlQuery,[article_id])

        if(rowCount===0){

            const err = new Error("No Article Found");
            err.status = 404;
            throw err;
        }
        
        sqlQuery = `
        UPDATE articles SET
        author= $1,
        body= $2,
        votes = votes + $3
        WHERE article_id =$4 RETURNING *`

          const { rows } = await db.query(sqlQuery, [username, body, votes, article_id]);
          return rows[0];


        } catch (err) {
        return err
    }

    
}