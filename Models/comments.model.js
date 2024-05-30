const db = require('../db/connection')

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

exports.removeCommentById= async (comment_id)=>{
try{
    let sqlQuery = ``;
        
        sqlQuery += `SELECT * FROM comments WHERE comment_id = $1`
        sqlQuery +=`;`;
        const {rowCount} = await db.query(sqlQuery,[comment_id])

        if(rowCount===0){
            const err = new Error("No Comment Found");
            err.status = 404;
            throw err;
        }
     
        sqlQuery = `DELETE FROM comments where comment_id = $1`;
        sqlQuery +=`;`;
        return await db.query(sqlQuery, [comment_id]);
         
    } catch (err) {
        return err
    }
}