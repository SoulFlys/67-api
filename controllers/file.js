import fs from 'fs'
import path from 'path'
import asyncBusboy from 'async-busboy'

module.exports = {
    'POST /admin/file/add': async(ctx, next) => {
        const {files, fields} = await asyncBusboy(ctx.req);
        let file = files[0];
        // console.log(file);
        let tmpArr = file['filename'].split('.');
        let ext ='.' + tmpArr[tmpArr.length - 1];
        let filename = parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext;
        let stream = fs.createWriteStream(path.join(path.resolve(__dirname,'../uploads'), filename));
        file.pipe(stream);
        // console.log(stream)
        ctx.rest({
            name:filename,
            url:'http://localhost:3000/'+filename
        });
    }
}
