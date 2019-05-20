# NangKa
    如果你想搭建静态资源服务器，或者发布静态资源，nangka 将是你的一个不错的选择
    你既可以将 nangka 作为命令行工具使用，也可以引入项目中，进行个性化定制开发
> [GitHub 传送门](https://github.com/Jetz1818/nangka)
---

## 功能：
    1. 任意目录都可发布成静态站点
    2. 支持HTTP缓存
    3. 传输流压缩，更少的流量，更快的速度
    4. 支持正向代理，可以用于跨域，或者简单联调线上API
    5. 简单清晰地展示资源目录

## 安装
```bash
npm install nangka
```

## 使用
### 1. 作为命令行工具使用
```bash
npx nangka [--options]
```
##### Example：
```bash
npx nangka --r /usr/local --h 127.0.0.1 --p 8081
```
##### 如果在工作目录使用：
```bash
npx nangka
```
将会默认监听 http://0.0.0.0:8080 , 并自动使用默认浏览器打开

options:    
 - r,root_path 指定要发布的静态资源目录（必须是绝对路径）
 - h,host      指定静态资源服务器主机（ip/域名）[默认 127.0.0.1]
 - p,port      指定静态资源服务器端口号[默认 8080]
 - thost       指定需要正向代理的服务器主机（ip/域名）
 - tport       指定需要正向代理的服务器端口号
> 备注：thost & tport 不输入指令的话，默认不会开启正向代理

### 2. CommonJs
```js
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
```
### 3. 正向代理使用
如果需要在静态资源文件内请求其他服务器资源，比如 ajax 跨域请求等，可以开启正向代理    
简单例子：     
    静态资源服务器为： http://127.0.0.1:8080     
    API所在服务器： http://127.0.0.1:8099

```bash
cd /usr/local
npx nangka --thost 127.0.0.1 --tport 8099
```    

此时 ajax请求 http://127.0.0.1:8080/api/home?username=jun , 即会被代理至 http://127.0.0.1:8088/home?username=jun
，其中 /api/是不可缺少的接口标识

# 版本更新日志：
1. v1.0.1-beta 
    - 增加 README.md 说明文档
    - 增加 正向代理功能
2. v1.0.2-beta
    - 修复了 CentOS 上可能无法使用的问题
3. v1.0.3-beta
    - 修复了使用反向代理进行内外网穿透时，无法访问的问题
    - 修复markdown文档显示中文乱码的问题    

# Keywords
static server,serve,静态资源服务器,proxy,正向代理

