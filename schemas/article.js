import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const ArtSchema = new mongoose.Schema({
    cid: {type: ObjectId, ref: 'Category'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    content: {type: String, required: true},
    readings: {type: Number, required: true, default: 1},
    comment: {type: Number, default: 0},
    tags: {type: Array },
    author: {type: String},
    alone: {type: Boolean, default: false},
    delete: {type: Boolean, default: false},
    status: {type: Boolean, default: true},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

ArtSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default ArtSchema;
