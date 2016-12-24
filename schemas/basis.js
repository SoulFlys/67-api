import mongoose from 'mongoose'

const BasisSchema = new mongoose.Schema({
    logo: {type: String, required: true},
    pic: {type: String, required: true},
    nick: {type: String, required: true},
    weixin: {type: String},
    weibo: {type: String},
    qq: {type: String},
    github: {type: String},
    copyright: {type: String, required: true},
    record: {type: String, required: true},
    hits: {type: Number,default: 0},
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

BasisSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

export default BasisSchema;
