const http = require ('http');
const {host, port,base_path} = require ('./config/config');
const async_fn = require ('./src/async');
const auto_open = require ('./src/auto-open');
// 暴露 Server，既可以作为命令行工具，又可以作为第三方包使用
class Server {
  constructor (argv) {
    const detail_config = Object.assign({host, port, root_path: base_path}, argv);
    if (argv.thost && argv.tport) {
      detail_config.proxy={thost:argv.thost,tport:argv.tport}
    }
    this.config = detail_config;
    // console.log (this.config);
  }
  //启动服务
  startServer(){
    //创建服务
    const server = http.createServer ((request, response) => {
      async_fn (request, response,this.config);
    });

    //监听服务
    server.listen (this.config.port||port, this.config.host||host, () => {
      console.log (`server is running on http://${this.config.host||host}:${this.config.port||port}`);
      auto_open (`http://${this.config.host||host}:${this.config.port||port}`);//浏览器自动打开
    });
  }
}

module.exports = Server;



