import Category from '../models/category'
const APIError = require('../lib/init').APIError;

module.exports = {
    'POST /admin/category/add': async(ctx, next) => {
        let category = await new Category(ctx.request.body).save();
        ctx.rest({'status': 'ok'});
    },
    'POST /admin/category': async(ctx, next) => {
        let category = await Category.find({}).sort('sort');
        ctx.rest(category);
    },
    'DELETE /admin/category/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let category = await Category.findByIdAndRemove(id);
        if (category) {
            ctx.rest({'status': 'ok'});
        } else {
            ctx.rest({'status': 'no'});
        }
    },
    'POST /admin/category/findById': async(ctx, next) => {
        let id = ctx.request.body.id;
        let category = await Category.findById(id);
        ctx.rest(category);
    },
    'PUT /admin/category/update': async(ctx, next) => {
        let id = ctx.request.body.id;
        let category = await Category.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(category, ctx.request.body);
        let result = await new Category(category).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },

    'GET /blog/category': async(ctx, next) => {
        try{
            let category = await Category.find({status:true}).sort('sort');
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取文章分类失败',result:[]});
        }
    },
}
