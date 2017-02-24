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
