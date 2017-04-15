import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    pid: {type: String, required: true, default: 0},
    level: {type: Number, default: 1},      //1级栏目，2级栏目
    name: {type: String, required: true},
    type: {type: Number, default: 1},       //1=>分类栏目 2=>单独页面
    router: {type: String, required: true}, //栏目指向地址(2=>id)
    sort: {type: Number, required: true, default: 1},
    status: {type: Boolean, default: true},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

CategorySchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
    }
    next();
});

export default CategorySchema;
