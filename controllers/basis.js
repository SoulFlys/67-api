import mongoose from 'mongoose'
import Basis from '../models/basis'

module.exports = {    
    'POST /admin/basis/add': async(ctx, next) => {
        let basis = await new Basis(ctx.request.body).save();
        ctx.rest({'status':'ok'});
    },
    'POST /admin/basis': async(ctx, next) => {
        let basis = await Basis.find({}).sort('meta.createAt');
        ctx.rest(basis);
    },
    'POST /blog/basis': async(ctx, next) => {
        let basis = await Basis.find({}).sort('meta.createAt');
        ctx.rest(basis[0]);
    },
    'POST /blog/basis/hits': async(ctx, next) => {
        let basis = await Basis.find({}).sort('meta.createAt');
        let result = await Basis.update({_id:basis[0]._id},{$set:{hits:basis[0].hits + 1}});
        if(result){
            ctx.rest({'status':'ok'});
        }else{
            ctx.rest({'status':'no'});
        }
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
    }
}
