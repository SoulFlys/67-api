import mongoose from 'mongoose'
import Focus from '../models/focus'

module.exports = {
    'POST /admin/focus/add': async(ctx, next) => {
        let focus = await Focus(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/focus': async(ctx, next) => {
        let focus = await Focus.find({}).populate('articleId').sort('meta.createAt');
        ctx.rest(focus);
    },
    'DELETE /admin/focus/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let focus = await Focus.findByIdAndRemove(id);
        if(focus){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/focus/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let focus = await Focus.findById(id);
        ctx.rest(focus);
    },
    'PUT /admin/focus/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let focus = await Focus.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(focus, ctx.request.body);
        let result = await new Focus(focus).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    }
}
