import Admin from '../models/admin'

module.exports = {
    'GET /admin/67one/init': async (ctx,next) => {
        let admin = await new Admin({
            username: 'xiaofang',
            nickname: '时光笑我温暖如阳',
            realname: '小方',
            password: '123456',
            status: true
        }).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/admin/add': async(ctx, next) => {
        let admin = await new Admin(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/admin': async(ctx, next) => {
        let admins = await Admin.find({}).sort('createAt');
        ctx.rest(admins);
    },
    'DELETE /admin/admin/delete': async(ctx, next) => {
        let id = ctx.request.body.id;
        let admin = await Admin.findByIdAndRemove(id);
        if(admin){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/admin/findById': async(ctx,next) => {
        let id = ctx.request.body.id;
        let admin = await Admin.findById(id);
        ctx.rest(admin);
    },
    'PUT /admin/admin/update': async(ctx,next) => {
        let id = ctx.request.body.id;
        let admin = await Admin.findById(id);
        ctx.request.body._id = ctx.request.body.id;
        delete ctx.request.body.id;

        Object.assign(admin, ctx.request.body);
        let result = await new Admin(admin).save();
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
    },
    'POST /admin/admin/login': async(ctx, next) => {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let admin = await Admin.findOne({username:username});
        if(admin){
            let isTrue = await admin.comparePassword(password);
            if(isTrue){
                ctx.rest({'status':'ok',data:{
                    username:admin.username,
                    nickname:admin.nickname,
                    realname:admin.realname
                }});
            }else{
                ctx.rest({'status':'no',message:'密码错误，请重新输入密码'});
            }
        }else{
            ctx.rest({'status':'no',message:'用户名不存在'});
        }
    },
}
