import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
let SALT_WORK_FACTOR = 10

let AdminSchema = new mongoose.Schema({
    username: {type: String,required: true},
    nickname: String,
    realname: String,
    password: {type: String,required: true},
    avatar: String,
    createip: {type: String},
    lastloginip: String,
    status: {type: Boolean, default: true},
    meta: {
        createAt: {
            type: Date,
            default: parseInt(Date.now()/1000)
        },
        updateAt: {
            type: Date,
            default: parseInt(Date.now()/1000)
        }
    }
});

AdminSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.hash(this.password,SALT_WORK_FACTOR,(err, hash) => {
         this.password = hash;
         next();
    });
});

AdminSchema.methods = {
    comparePassword: function(_password){
        bcrypt.compare(_password, this.password, (err, res) => res);
    }
}

// AdminSchema.statics = {
//     findAll: async function() {
//         return this.find({}).sort('meta.createAt').exec()
//     },
//     findById: async function(id) {
//         return this.findOne({_id: id}).exec()
//     }
// }

export default AdminSchema
