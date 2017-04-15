import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    href: {type: String, required: true},
    type: {type: String, required: true},
    sort: {type: Number, required: true, default: 1},
    status: {type: Boolean, default: true},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

LinkSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default LinkSchema;
