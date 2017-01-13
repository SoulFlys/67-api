import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
mongoose.Promise = global.Promise;
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
    comparePassword: async function(_password){
        let password = this.password;
        let res = await bcrypt.compare(_password, password).then(res => res);
        return res;
    }
}


export default AdminSchema
