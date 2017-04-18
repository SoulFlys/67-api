module.exports = (pathPrefix) => {
    return async (ctx, next) => {
        ctx.rest = (data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = data;
        }
        await next();
    };
}
