import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import staticServer from 'koa-static'
import mongoose from 'mongoose'
import router from './lib/router'
import init from './lib/init'
import {port, mongodb, baseApi} from './config'
import path from 'path'

mongoose.connect(mongodb);
mongoose.connection.on('error', console.error)

const app = new Koa();


app.use(convert.compose(
    staticServer(path.join(__dirname,'uploads')),
    cors(),
    logger(),
    bodyParser(),
    init.restify('/' + baseApi),
    router()
))


app.listen(port);
console.log('app started at port ' + port + '...');
