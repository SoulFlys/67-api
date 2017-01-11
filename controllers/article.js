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
