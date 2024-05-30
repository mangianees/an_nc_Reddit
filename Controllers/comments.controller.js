const {insertCommentOnArticle,fetchCommentsByArticleId,removeCommentById} = require('../Models/comments.model')

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

exports.deleteCommentById=(req,res,next)=>{
    const {comment_id} = req.params;
    removeCommentById(comment_id).then((comment)=>{
        if(comment.status!==404){
            res.status(204).send("")
        }else{
            res.status(404).send({msg: "No Article Found"})
        }
        

    });

}