import mongoose from 'mongoose'
import Link from '../models/link'

module.exports = {
    'POST /admin/link/add': async(ctx, next) => {
        let link = await new Link(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/link': async(ctx, next) => {
        let links = await Link.find({}).sort('.createAt');
        ctx.rest(links);
    },
    'DELETE /admin/link/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let link = await Link.findByIdAndRemove(id);
        if(link){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/link/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let link = await Link.findById(id);
        ctx.rest(link);
    },
    'PUT /admin/link/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let link = await Link.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(link, ctx.request.body);
        let result = await new Link(link).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },

    'GET /blog/link': async(ctx, next) => {
        try{
            let links = await Link.find({status:true}).sort('sort');
            ctx.rest({status:true,message:'',result:links});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取友情链接失败',result:[]});
        }
    },
}
