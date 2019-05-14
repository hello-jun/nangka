const NangKa = require ('nangka');
//配置对象
const config = {
  host:'127.0.0.1',
  port:'8080',
  root_path:'/usr/local',
  proxy:{//不配置此属性，则不会开启代理
    thost:'http://www.baidu.com',//目标服务器主机
    tport:'8099'//目标服务器端口
  }
};
const server = new NangKa (config);
//启动服务
server.startServer ();
