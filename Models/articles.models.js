const db = require('../db/connection')

exports.fetchArticles=((articleId,topic)=>{
const validSort_by =['created_at'];

let sqlQuery= ``; 
const queryValues=[];

    if(!articleId){
        sqlQuery += `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at,
        articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
            FROM articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY articles.article_id ORDER BY articles.created_at DESC;`
    }

    if(articleId){
        sqlQuery += `SELECT articles.author,articles.body, articles.title, articles.article_id, articles.topic, articles.created_at,
        articles.votes, articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
 FROM articles
 LEFT JOIN comments ON articles.article_id = comments.article_id `
        
        sqlQuery += `WHERE articles.article_id = $1
        GROUP BY articles.author,articles.body, articles.title, articles.article_id, articles.topic, articles.created_at,
                 articles.votes, articles.article_img_url;`;
        queryValues.push(articleId);
    }
    

if(topic){
    sqlQuery = ``;
    sqlQuery += `select * FROM ARTICLES WHERE topic= $1`;
    queryValues.push(topic);
}
return db.query(sqlQuery,queryValues)
    .then((result)=>{
        return result.rows;
})
})

exports.updateArticle = async (username,body,votes,article_id)=>{
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