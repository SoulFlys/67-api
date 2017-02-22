import mongoose from 'mongoose'
import Article from '../models/article'

module.exports = {
    'POST /admin/article/add': async(ctx, next) => {
        let article = await new Article(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/article': async(ctx, next) => {
        let category = await Article.find({}).populate('cid').sort('meta.createAt');
        ctx.rest(category);
    },
    'POST /blog/article/readings': async(ctx, next) => {
        let id = ctx.request.body.id;
        let article = await Article.findById(id);
        let result = await Article.update({_id:id},{$set:{readings:article.readings + 1}});
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /blog/allArticle': async(ctx, next) => {
        let category = await Article.find({status:true,delete:false}).$where('this.title !== "关于我"').populate('cid').sort('meta.createAt').select('title meta _id');
        ctx.rest(category);
    },
    'POST /blog/article': async(ctx, next) => {
        let currentPage = ctx.request.body.currentPage;
        let pageSize = ctx.request.body.pageSize;
        let cid = ctx.request.body.cid;
        let articleList;
        let count;
        if(cid){
            articleList = await Article.find({status:true}).populate('cid').sort('meta.createAt').where('cid',cid).skip(pageSize*(currentPage-1)).limit(pageSize).select('title meta _id readings image description');
            count = await Article.find({status:true}).populate('cid').sort('meta.createAt').where('cid',cid).count();
        }else{
            articleList = await Article.find({status:true}).$where('this.title !== "关于我"').populate('cid').sort('meta.createAt').skip(pageSize*(currentPage-1)).limit(pageSize).select('title meta _id readings image description');
            count = await Article.find({status:true}).$where('this.title !== "关于我"').populate('cid').sort('meta.createAt').count();
        }
        ctx.rest({
            articleList:articleList,
            count:count
        });
    },
    'PUT /admin/article/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let article = await Article.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(article, ctx.request.body);
        let result = await new Article(article).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/article/trash': async(ctx, next) => {
        let category = await Article.find({delete:true}).populate('cid').sort('meta.createAt');
        ctx.rest(category);
    },
    'POST /admin/article/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let category = await Article.findById(id);
        ctx.rest(category);
    },
    'POST /blog/article/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let category = await Article.findById(id);
        ctx.rest(category);
    },
    'PUT /admin/article/nodelete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let isDel = ctx.request.body.del;
        let result = await Article.update({_id:id},{$set:{delete:isDel}});
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'DELETE /admin/article/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let result = await Article.findByIdAndRemove(id);
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
}
