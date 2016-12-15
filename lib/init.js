module.exports = {
    APIError: (code, message) => {
        console.log('code,message',code,message);
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定rest()方法:
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    // 返回错误:
                    console.log(e);
                    ctx.response.status = 200;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        status: 'no',
                        message: e.message
                    };
                }
            } else {
                await next();
            }
        };
    }
};
