import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const FocusSchema = new mongoose.Schema({
    title: {type: String, required: true},
    articleId:{type: ObjectId, ref: 'Article'},
    pic: {type: String, required: true},
    sort: {type: Number, required: true, default: 1},
    status: {type: Boolean, default: true},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

FocusSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default FocusSchema;
