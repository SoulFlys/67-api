import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
mongoose.Promise = global.Promise;
let SALT_WORK_FACTOR = 10

let AdminSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    nickname: String,
    realname: String,
    password: {type: String,required: true},
    avatar: String,
    createip: {type: String},
    lastloginip: String,
    status: {type: Boolean, default: true},
    createAt: {type: Date,default: new Date()},
    updateAt: {type: Date,default: new Date()}
});

AdminSchema.pre('save', function(next){
    if (this.isNew) {
        this.createAt = this.updateAt = new Date()
    } else {
        this.updateAt = new Date()
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
