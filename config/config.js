module.exports = {
  host: '0.0.0.0',
  port: '8080',
  base_path:process.cwd(),//命令启动路径
  compress_exts:['html','js','css','json','md','txt','xml'],
  cache:{
    maxAge:10,
    //强缓存
    //HTTP 1.0
    expires:true,//Fri, 31 May 2019 13:20:13 GMT
    // HTTP 1.1
    cacheControl:true,
    //协商缓存,只有强缓存失效的时候才会使用协商缓存
    //Http 1.1
    lastModified:true,
    etag:true
  },
  //代理默认关闭
  proxy:false
};
