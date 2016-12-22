import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    pid: {type: String, required: true, default: 0},
    level: {type: Number, default: 1},      //1级栏目，2级栏目
    name: {type: String, required: true},
    type: {type: Number, default: 1},       //1=>分类栏目 2=>单独页面
    router: {type: String, required: true}, //栏目指向地址(2=>id)
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

CategorySchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});


CategorySchema.statics = {
    findAll: async function() {
        return this.find({}).sort('meta.createAt').exec()
    },
    // findById: async function(id) {
    //     return this.findOne({_id: id}).exec()
    // },
}

export default CategorySchema;
