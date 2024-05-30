const {fetchArticles,fetchCommentsByArticleId,insertCommentOnArticle} = require('../Models/articles.models')


exports.getArticles=(req,res,next)=>{
try{
    const {article_id,sort_by} = req.query;
    fetchArticles(article_id,sort_by)
    .then((articles)=>{
        res.status(200).send(articles);
    })

}catch(err){
    next(err);
}

}

exports.getCommentsByArticleId=(req,res,next)=>{
try {
    const {article_id} = req.params;
    fetchCommentsByArticleId(article_id).then((comments)=>{
        res.status(200).send(comments);

    })
    
} catch (err) {
    next(err)
}

}

exports.postCommentOnArticle=(req,res,next)=>{
    const {username,body}=req.body; 
    const {article_id} = req.params;
    insertCommentOnArticle(username,body,article_id).then((comment)=>{
        if(comment.status!==404){
            res.status(201).send(comment)
        }else{
            res.status(404).send({msg: "No Article Found"})
        }
        

    });
}