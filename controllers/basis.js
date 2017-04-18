import Basis from '../models/basis'

module.exports = {
    'POST /admin/basis/add': async(ctx, next) => {
        let basis = await new Basis(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/basis': async(ctx, next) => {
        let basis = await Basis.find({}).sort('.createAt');
        ctx.rest(basis);
    },
    'PUT /admin/basis/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let basis = await Basis.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(basis, ctx.request.body);
        let result = await new Basis(basis).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },



    'GET /blog/basis': async(ctx, next) => {
        try{
            let basis = await Basis.find({}).sort('.createAt');
            ctx.rest({status:true,message:'',result:basis[0]});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取基本信息失败',result:{}});
        }
    },
    'GET /blog/basis/hits': async(ctx, next) => {
        try{
            let basis = await Basis.find({}).sort('.createAt');
            let result = await Basis.update({_id:basis[0]._id},{$set:{hits:basis[0].hits + 1}});
            ctx.rest({status:true,message:'',result:result});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'网站访问量+1失败'});
        }
    }
}
