const {fetchArticles,fetchCommentsByArticleId} = require('../Models/articles.models')


exports.getArticles=(req,res,next)=>{
try{
    const {article_id,sort_by} = req.query;
    fetchArticles(article_id,sort_by)
    .then((articles)=>{
        // console.log('cnt articles',articles);
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