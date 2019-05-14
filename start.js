/*
* 作为命令行js脚本入口
* - 读取命令行参数
*     - 使用yargs
* - 启动服务
* - 坑？命令为 wp workpath 时无法准确读取参数！！！
* */
const Server = require ('./app');
const argv = require ('yargs')
    .option ('port', {
      alias: 'p',
      describe: '静态资源服务器启动的端口号'
    })
    .option ('host', {
      alias: 'h',
      describe: '静态资源服务器启动的主机(ip/域名)'
    })
    .option ('root_path', {
      alias: 'r',
      describe: '静态资源服务器启动的根目录'
    })
    .option ('thost', {
      alias: 'th',
      describe: '目标服务器主机(ip/域名)'
    })
    .option ('tport', {
      alias: 'tp',
      describe: '目标服务器端口号'
    })
    .argv;
console.log (argv);
const server = new Server (argv);
server.startServer ();
