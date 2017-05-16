import Category from '../models/category'
const APIError = require('../lib/init').APIError;

module.exports = {
    'POST /admin/category/add': async(ctx, next) => {
        try{
            let category = await new Category(ctx.request.body).save();
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'新增分类失败',result:{}});
        }
    },
    'POST /admin/category': async(ctx, next) => {
        try{
            let category = await Category.find({}).sort('sort');
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取分类失败',result:[]});
        }
    },
    'DELETE /admin/category/delete': async(ctx, next) => {
        try{
            let id = ctx.request.body.id;
            let category = await Category.findByIdAndRemove(id);
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'删除分类失败',result:{}});
        }
    },
    'POST /admin/category/findById': async(ctx, next) => {
        try{
            let id = ctx.request.body.id;
            let category = await Category.findById(id);
            ctx.rest({status:true,message:'',result:category});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取分类信息失败',result:{}});
        }
    },
    'PUT /admin/category/update': async(ctx, next) => {
        try{
            let id = ctx.request.body.id;
            let category = await Category.findById(id);
            ctx.request.body._id = ctx.request.body.id;
            delete ctx.request.body.id;

            Object.assign(category, ctx.request.body);
            let result = await new Category(category).save();
            ctx.rest({status:true,message:'',result:result});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'更新分类信息失败',result:{}});
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
