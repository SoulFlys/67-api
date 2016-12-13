import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import mongoose from 'mongoose'
import router from './lib/router'
import init from './lib/init'
import {port, mongodb, baseApi} from './config'

mongoose.connect(mongodb);
mongoose.connection.on('error', console.error)

const app = new Koa();

// app.use(convert(async(ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     await next();
// }));

app.use(convert.compose(
    cors(),
    logger(),
    bodyParser(),
    init.restify('/' + baseApi),
    router()
))

// app.use(cors());
// app.use(bodyParser());
// app.use(init.restify('/' + baseApi));
// app.use(router());

app.listen(port);
console.log('app started at port ' + port + '...');
