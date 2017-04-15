import mongoose from 'mongoose'
// let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

const BasisSchema = new mongoose.Schema({
    logo: {type: String, required: true},
    pic: {type: String, required: true},
    nick: {type: String, required: true},
    weixin: {type: String},
    banner: {type: String,required: true},
    tip: {type: String},
    weibo: {type: String},
    qq: {type: String},
    github: {type: String},
    copyright: {type: String, required: true},
    record: {type: String, required: true},
    hits: {type: Number,default: 0},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

BasisSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default BasisSchema;
