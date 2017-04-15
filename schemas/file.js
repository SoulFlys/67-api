import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path: {type: String, required: true},
    url: {type: String},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

FileSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default FileSchema;
