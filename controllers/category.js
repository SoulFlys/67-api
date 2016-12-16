import mongoose from 'mongoose'
import Category from '../models/category'
// mongoose.Promise = global.Promise;
const APIError = require('../lib/init').APIError;

module.exports = {
    'POST /admin/category/add': async(ctx, next) => {
        // console.log(ctx.request.body);
        let category = await new Category(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/category': async(ctx, next) => {
        let category = await Category.findAll();
        ctx.rest(category);
    },
    'DELETE /admin/category/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let category = await Category.findByIdAndRemove(id);
        if(category){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/category/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let category = await Category.findById(id);
        ctx.rest(category);
    },
    'PUT /admin/category/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let category = await Category.findByIdAndUpdate(id, ctx.request.body, {new: true});
        if(category){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    }
}
