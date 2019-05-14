/*
* 流压缩，减少传输体积
* node 支持 deflate,gzip
* 支持mime类型 ： 'html','js','css','json','md','txt','xml']
* */
const {createGzip, createDeflate} = require ('zlib');
const path_util = require ('path');
const {compress_exts} = require ('../../config/config');
/**
 * deflate/gzip 压缩流
 * @param request
 * @param response
 * @param abs_path mime类型文件
 * @param targetStream 需要被压缩的流
 * @return {*|Deflate|*|Gzip|*}
 */
module.exports = function (request, response, abs_path, targetStream) {
//  获取mime类型(文件后缀最后一位)
  let ext = path_util.extname (abs_path).split ('.').pop ().toLowerCase ();
  if (!ext) {
    //  如果没有后缀，原样输出
    return targetStream;
  } else {
    if (compress_exts.includes (ext)) {
      // 其实是一个 incominsg message 对象
      const acceptEncoding = request.headers['accept-encoding'];
      //  node 支持 deflate,gzip
      if (!acceptEncoding.match (/\bgzip\b/) && !acceptEncoding.match (/\bdeflate\b/)) {
        //  不是的话原样返回
        return targetStream;
      } else if (acceptEncoding.match (/\bgzip\b/)) {
        response.setHeader ('Content-Encoding', 'gzip');
        return targetStream.pipe (createGzip ())//返回的是个 可写流（目标引用）
      } else if (acceptEncoding.match (/\bdeflate\b/)) {
        response.setHeader ('Content-Encoding', 'gzip');
        return targetStream.pipe (createDeflate ())//返回的是个 可写流（目标引用）
      }
    }else {
      return targetStream;
    }
  }
};

