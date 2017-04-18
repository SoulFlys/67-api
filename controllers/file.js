import fs from 'fs'
import path from 'path'
import asyncBusboy from 'async-busboy'
import File from '../models/file'
import {formatDate} from '../lib/filter'
import {baseUrl} from '../config'

module.exports = {
    'POST /admin/file': async(ctx, next) => {
        let files = await File.find({}).sort('.createAt');
        for(let file of files){
            file.url = baseUrl + file.name;
        }
        ctx.rest(files);
    },
    'POST /admin/file/add': async(ctx, next) => {
        const {files, fields} = await asyncBusboy(ctx.req);
        let file = files[0];    //单图上传
        let filePath = file.path
        let fileNameArr = file['filename'].split('.');
        let ext ='.' + fileNameArr[fileNameArr.length - 1];
        let filename = formatDate(new Date()) + '.' + parseInt(Math.random() * 100) + ext;
        let savePath = path.resolve(__dirname,'../uploads/images');

        if (!fs.existsSync(savePath)) {
            await fs.mkdirSync(path.resolve(__dirname,'../uploads/'));
            await fs.mkdirSync(path.resolve(__dirname,'../uploads/images/'));
        }

        let newPath = path.join(savePath, filename);
        let readAndWrite = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath,(err,buff)=>{
                    if(err){reject(err)}
                    fs.writeFile(newPath,buff,(err)=>{
                        if(err){reject(err)}
                        resolve(true)
                    })
                })
            });
        }

        let res = await readAndWrite();

        if(res === true){
            let result = await new File({name:filename,path:'/images/' + filename,url:baseUrl+filename}).save();
            ctx.rest({
                id: result._id,
                name:filename,
                path:'/images/' + filename,
                url:baseUrl + filename
            });
        }
    },
    'POST /admin/file/delete': async(ctx,next) => {
        let id = ctx.request.body.id;
        let file = await File.findById(id);
        let path = file.path;
        let resultDb = await File.findByIdAndRemove(id);
        let resultFile = await fs.unlinkSync(path);
        ctx.rest({'status':'ok'});
    }
}
