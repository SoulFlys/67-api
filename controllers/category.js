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
        // console.log(ctx.request.body);
        let category = await Category.findAll();
        ctx.rest(category);
    }
}
