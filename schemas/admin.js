import mongoose from 'mongoose'

let AdminSchema = new mongoose.Schema({
    username: {type: String,required: true},
    nickname: String,
    realname: String,
    password: {type: String,required: true},
    avatar: String,
    createip: {type: String,required: true},
    lastloginip: String,
    meta: {
        createAt: {
            type: Date,
            default: parseInt(Date.now()/1000)
        },
        updateAt: {
            type: Date,
            default: parseInt(Date.now()/1000)
        }
    },
    status: {
        type: Number,
        default: 1
    }
});

AdminSchema.pre('save', (next) => {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

AdminSchema.statics = {
    findAll: async function() {
        return this.find({}).sort('meta.createAt').exec()
    },
    findById: async function(id) {
        return this.findOne({_id: id}).exec()
    }
}

export default AdminSchema
