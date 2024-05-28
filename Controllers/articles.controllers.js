const {fetchArticles} = require('../Models/articles.models')


exports.getArticles=(req,res,next)=>{
    const articleId = req.params;
    fetchArticles(articleId.article_id)
    .then((result)=>{
        res.status(200).send(result);
    })
}