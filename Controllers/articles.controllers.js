const {fetchArticles,countComments} = require('../Models/articles.models')


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

