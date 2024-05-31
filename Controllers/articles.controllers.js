const {fetchArticles,updateArticle} = require('../Models/articles.models')


exports.getArticles=(req,res,next)=>{
try{
    const {article_id,sort_by,topic} = req.query;
    fetchArticles(article_id,topic)//sort_by deleted
    .then((articles)=>{
        res.status(200).send(articles);
    })

}catch(err){
    next(err);
}

}



exports.patchArticleById=(req,res,next)=>{
    const {username,body,votes}=req.body; 
    const {article_id} = req.params;
    updateArticle(username,body,votes,article_id).then((comment)=>{
        if(comment.status!==404){
            res.status(201).send(comment)
        }else{
            res.status(404).send({msg: "No Article Found"})
        }
    });
}