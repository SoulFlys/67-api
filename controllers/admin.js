import Admin from '../models/admin'

module.exports = {
    'GET /admin/67one/init': async (ctx,next) => {
        try{
            let admin = await new Admin({
                username: 'admin',
                nickname: 'admin',
                realname: 'Administrator',
                password: '123456',
                status: true
            }).save();
            ctx.rest({status:true,message:'',result:admin});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'当前用户已存在',result:{}});
        }
    },
    'POST /admin/admin/add': async(ctx, next) => {
        try{
            let admin = await new Admin(ctx.request.body).save();
            ctx.rest({status:true,message:'',result:admin});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'新增管理员失败',result:{}});
        }
    },
    'POST /admin/admin': async(ctx, next) => {
        try{
            let admins = await Admin.find({}).sort('createAt');
            ctx.rest({status:true,message:'',result:admins});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取管理员列表失败',result:[]});
        }
    },
    'DELETE /admin/admin/delete': async(ctx, next) => {
        try{
            let id = ctx.request.body.id;
            let admin = await Admin.findByIdAndRemove(id);
            ctx.rest({status:true,message:'',result:admin});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'删除当前管理员失败',result:{}});
        }
    },
    'POST /admin/admin/findById': async(ctx,next) => {
        try{
            let id = ctx.request.body.id;
            let admin = await Admin.findById(id);
            ctx.rest({status:true,message:'',result:admin});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'获取当前管理员信息失败',result:{}});
        }
    },
    'PUT /admin/admin/update': async(ctx,next) => {
        try{
            let id = ctx.request.body.id;
            let admin = await Admin.findById(id);
            ctx.request.body._id = ctx.request.body.id;
            delete ctx.request.body.id;

            Object.assign(admin, ctx.request.body);
            let result = await new Admin(admin).save();
            ctx.rest({status:true,message:'',result:result});
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'更新管理员信息失败',result:{}});
        }
    },
    'POST /admin/admin/login': async(ctx, next) => {
        try{
            let username = ctx.request.body.username;
            let password = ctx.request.body.password;
            let admin = await Admin.findOne({username:username});
            if(admin){
                let isTrue = await admin.comparePassword(password);
                if(isTrue){
                    ctx.rest({'status':true,result:{
                        username:admin.username,
                        nickname:admin.nickname,
                        realname:admin.realname
                    }});
                }else{
                    ctx.rest({'status':false,message:'密码错误，请重新输入密码'});
                }
            }else{
                ctx.rest({'status':false,message:'用户名不存在'});
            }
        }catch(err){
            console.log(ctx.request.method + ' ' + ctx.request.url , err.message);
            ctx.rest({status:false,message:'登陆失败，请稍后重试',result:{}});
        }
    },
}
