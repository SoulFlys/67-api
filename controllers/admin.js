import mongoose from 'mongoose'
import Admin from '../models/admin'
import {baseApi} from '../config'
mongoose.Promise = global.Promise;
const APIError = require('../lib/init').APIError;

module.exports = {
    'GET /blog/admin': async(ctx, next) => {
        try {
            var res = await Admin.findAll();
            console.log(res);
            ctx.rest(res);
        } catch (err) {
            console.log(err);
            throw new APIError('admin:not_found', 'admin not found');
        }
    },
    'GET /blog/admin/:id': async(ctx, next) => {
        let id = ctx.params.id;
        try {
            var res = await Admin.findById(id);
            ctx.rest(res);
        } catch (err) {
            console.log(err);
            throw new APIError('admin:not_found', 'admin_id not found');
        }
    },
    'POST /blog/admin/add': async(ctx, next) => {
        // console.log(ctx)
        // console.log(ctx.params.username)
        // console.log(ctx.params)
        // console.log(ctx.query)
        // console.log(ctx.body)
        console.log(ctx.request.body)
        ctx.rest({'status':123});
    }
}
