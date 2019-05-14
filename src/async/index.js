const fs = require ('fs');
const path_util = require ('path');
const jade = require ('jade');
const mime = require ('../mime');
const {base_path} = require ('../../config/config');
const compress = require ('../compress');
const cache = require ('../cache');
const proxyHandler = require ('../proxy');

module.exports = function (request, response, config) {
  try {
    const {root_path, proxy} = config;
    const {url} = request;
    const pathstr = url.split ('?')[0];
    const path = decodeURI (pathstr);
    // console.log (path);
    const abs_path = path_util.join (root_path || base_path, path);//文件或者目录的绝对路径
    if (url === '/favicon.ico') {
      response.end ('no .ico')
    } else if (proxy && url.includes ('/api/')) {
      //  是接口请求（开启代理）
      console.log ('走代理');
      proxyHandler(proxy,request,response)
    } else {
      fs.stat (abs_path, async (err, stats) => {
        if (err) {
          console.log (`11111————${err}`);
          const renderFilePath = path_util.resolve (__dirname, '../jade/404.jade');
          const html = jade.renderFile (renderFilePath);
          response.writeHead (404, '', {
            'Content-Type': 'text/html;charset=utf-8'
          });
          response.end (html)
        } else {
          if (stats.isFile ()) {
            //如果是文件类型,直接返回显示文件内容
            const mimeType = mime (abs_path) ? mime (abs_path).ct : 'text/plain;charset=utf-8';
            const r = fs.createReadStream (abs_path);
            response.setHeader ('Content-Type', mimeType);// 设置响应报文的媒体类型
            const rstream = compress (request, response, abs_path, r);
            const cacheFlag = await cache (request, response, {}, abs_path);
            if (cacheFlag) {
              response.writeHead (304, 'user Cache', {
                'Content-type': mimeType
              });
              response.end ('use cache')
            } else {
              response.writeHead (200, 'user Cache', {
                'Content-type': mimeType
              });
              rstream.pipe (response);
            }

          } else if (stats.isDirectory ()) {
            //  如果是目录，需要读取目录下所有文件路径，并通过jade 在服务器端渲染，返回一个dir列表页面
            fs.readdir (abs_path, (err, files) => {
              const fileList = files.map ((value, index, array) => {
                // console.log (value);
                return {name: value, iconClass: mime (value) ? mime (value).icon : 'iconfont icon-xiangmuguanlixitong-'}
              });
              // console.log (fileList);
              const renderFilePath = path_util.resolve (__dirname, '../jade/dir-list.jade');
              const html = jade.renderFile (renderFilePath, {'files': fileList, 'dir': path === '/' ? '' : path + '/'});
              response.end (html)
            });
          }
        }
      });
    }
  } catch (e) {
    console.log (`11111————${e}`);
    const renderFilePath = path_util.resolve (__dirname, '../jade/404.jade');

    const html = jade.renderFile (renderFilePath);
    response.end (html)
  }
};
