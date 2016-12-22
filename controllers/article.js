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
}
