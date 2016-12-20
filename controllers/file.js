import fs from 'fs'
import path from 'path'
import asyncBusboy from 'async-busboy'
import File from '../models/file'
import {formatDate} from '../lib/fiter'
import {baseUrl} from '../config'

module.exports = {
    'POST /admin/file': async(ctx, next) => {
        let files = await File.find({}).sort('meta.createAt');
        for(let file of files){
            file.url = baseUrl + file.name;
        }
        ctx.rest(files);
    },
    'POST /admin/file/add': async(ctx, next) => {
        const {files, fields} = await asyncBusboy(ctx.req);
        let file = files[0];    //单图上传
        let tmpArr = file['filename'].split('.');
        let ext ='.' + tmpArr[tmpArr.length - 1];
        let filename = formatDate(new Date()) + '.' + parseInt(Math.random() * 100) + ext;
        let stream = fs.createWriteStream(path.join(path.resolve(__dirname,'../uploads'), filename));
        file.pipe(stream);
        let result = await new File({name:filename,path:stream.path}).save();
        // console.log(file);
        // console.log(stream.path)
        // console.log(result)
        ctx.rest({
            id: result._id,
            name:filename,
            url:baseUrl + filename
        });
    },
    'POST /admin/file/delete': async(ctx,next) => {
        let id = ctx.request.body.id;
        let file = await File.findById(id);
        let path = file.path;
        let resultDb = await File.findByIdAndRemove(id);
        let resultFile = await fs.unlinkSync(path);
        // console.log(resultDb,resultFile);
        ctx.rest({'status':'ok'});
    }
}
