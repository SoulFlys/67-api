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
    tags: {type: String},
    author: {type: String},
    status: {type: Number, default: 1},
    alone: {type: Number, default: 0},
    delete: {type: Number, default: 0},
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

ArtSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

export default ArtSchema;
