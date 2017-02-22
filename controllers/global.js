import Basis from '../models/basis'
import Category from '../models/category'
import Link from '../models/link'
import Focus from '../models/focus'
import Article from '../models/article'

module.exports = {
    'POST /blog/global': async(ctx, next) => {
        let basis = await Basis.find({}).sort('meta.createAt');
        let category = await Category.find({status:true}).sort('sort');
        let links = await Link.find({status:true}).sort('sort');
        let focus = await Focus.find({status:true}).populate('articleId').sort('meta.createAt');

        let currentPage = ctx.request.body.currentPage;
        let pageSize = ctx.request.body.pageSize;
        let articleList = await Article.find({status:true}).$where('this.title !== "关于我"').populate('cid').sort('meta.createAt').skip(pageSize*(currentPage-1)).limit(pageSize).select('title meta _id readings image description');
        let count = await Article.find({status:true}).$where('this.title !== "关于我"').populate('cid').sort('meta.createAt').count();

        let id = ctx.request.body.id;
        let article = {};
        if(id){
            article = await Article.findById(id);
        }

        ctx.rest({
            basis: basis[0],
            category: category,
            links: links,
            focus: focus,
            articleList: articleList,
            count: count,
            article: article
        })
    }
}
