import Article from '../models/article'
import {getComment} from '../lib/api'

module.exports = {
    'POST /admin/article/add': async(ctx, next) => {
        let article = await new Article(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/article': async(ctx, next) => {
        let category = await Article.find({}).populate('cid').sort('createAt');
        ctx.rest(category);
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
        let category = await Article.find({delete:true}).populate('cid').sort('.createAt');
        ctx.rest(category);
    },
    'POST /admin/article/findById': async(ctx,next) => {
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



    'GET /blog/article/findById': async(ctx,next) => {
        try{
            let id = ctx.query.id;
            let article = await Article.findById(id);
            ctx.rest({status:true,message:'',result:article});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'当前文章不存在',result:{}});
        }
    },
    'GET /blog/article/readings': async(ctx, next) => {
        try{
            let id = ctx.query.id;
            let article = await Article.findById(id);
            let result = await Article.update({_id:id},{$set:{"readings":article.readings + 1}});
            ctx.rest({status:true,message:'',result:result});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'更新阅读量失败',result:{}});
        }
    },
    'GET /blog/allArtList': async(ctx, next) => {
        try{
            let category = await Article.find({status:true,delete:false}).sort('createAt').select('_id title createAt');
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取所有文章列表失败',result:[]});
        }
    },
    //首页分页获取文章列表
    'GET /blog/article': async(ctx, next) => {
        try{
            let currentPage = parseInt(ctx.query.currentPage);
            let pageSize = parseInt(ctx.query.pageSize);
            let articleList = await Article.find({status:true,delete:false}).sort('createAt').skip(pageSize*(currentPage-1)).limit(pageSize).select('_id title readings image description comment createAt');
            let count = await Article.find({status:true,delete:false}).count();
            ctx.rest({
                status:true,
                message:'',
                result:{
                    articleList:articleList,
                    count:count
                }
            });
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取分页列表失败',result:{
                articleList:[],
                count:0
            }});
        }
    },
}
