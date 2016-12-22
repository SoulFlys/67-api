import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    href: {type: String, required: true},
    type: {type: String, required: true},
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

LinkSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

export default LinkSchema;
