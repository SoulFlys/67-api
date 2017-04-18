import fs from 'fs'
import path from 'path'
import {baseApi} from '../config'

function addRouter(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = '/' + baseApi + url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = '/' + baseApi + url.substring(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            var path = '/' + baseApi +  url.substring(4);
            router.put(path, mapping[url]);
        } else if (url.startsWith('DELETE ')) {
            var path = '/' + baseApi +  url.substring(7);
            router.del(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(path.resolve(__dirname, '../') + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        let mapping = require(path.resolve(__dirname, '../') + '/' + dir + '/' + f);
        addRouter(router, mapping);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
