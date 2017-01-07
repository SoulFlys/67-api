import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const FocusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    articleId:{type: ObjectId, ref: 'Article'},
    pic: {type: String, required: true},
    sort: {type: Number, required: true, default: 1},
    status: {type: Boolean, default: true},
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

FocusSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

export default FocusSchema;
