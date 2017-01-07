import mongoose from 'mongoose'
// let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

const BasisSchema = new mongoose.Schema({
    logo: {type: String, required: true},
    pic: {type: String, required: true},
    nick: {type: String, required: true},
    weixin: {type: String},
    weibo: {type: String},
    qq: {type: String},
    github: {type: String},
    // focusTitle1:{type: String},
    // focusAid1:{type: ObjectId, ref: 'Article'},
    // focusPicUrl1:{type: String},
    // focusTitle2 :{type: String},
    // focusAid2:{type: ObjectId, ref: 'Article'},
    // focusPicUrl2:{type: String},
    // focusTitle3 :{type: String},
    // focusAid3:{type: ObjectId, ref: 'Article'},
    // focusPicUr3:{type: String},
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
