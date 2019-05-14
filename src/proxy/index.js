/*
* 做正向代理
* 将静态资源服务器作为代理服务器 http://127.0.0.1:8080
* view 层，ajax 请求 目标服务器：http://127.0.0.1:8081/api/  实际过程如下：
* req--请求本地--> http://127.0.0.1:8080--转发-->http://127.0.0.1:8081/api/
* res<--转发-- http://127.0.0.1:8080 <--通知--http://127.0.0.1:8081/api/
* */
const http = require ('http');
module.exports = function (proxy,request,response) {
  try {
    //接口prefix = /api 直接约定好
    const {tport,thost} = proxy;
    let {url, method} = request;
    let dataStr = '';
    let proxyRequest;
    //（去除 接口prefix）
    url = url.replace ('/api/', '/');

    // 直接原样转发
    if (tport) {
      console.log (`proxy---http://${thost}:${tport}${url}`);
      proxyRequest = http.request (`http://${thost}:${tport}${url}`);
    } else {
      proxyRequest = http.request(`http://${thost}${url}`);
    }
    proxyRequest.on ('response', message => {
      message.on ('data', (data) => {
        dataStr += data.toString ()
      });
      message.on ('end', () => {
        response.end (dataStr);//转发json格式
      });
    });
    proxyRequest.method = method;
    // proxyRequest.setHeader(request.headers);
    proxyRequest.end ();
  }catch (e) {
    console.log (`proxy22---${e}`);
  }

};
