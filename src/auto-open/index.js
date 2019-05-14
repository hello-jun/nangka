/*
* 自动打开网页
        process.platform
            process.platform属性返回字符串，标识Node.js进程运行其上的操作系统平台。
                'darwin'  : mac
                'win32'
                'linux'

        使用node的child_process模块
            child_process.exec(command)
                command <string> 运行的命令，参数使用空格分隔
                    win32:
                        打开网页的命令：start http://www.baidu.com （mac为open）
                        指定浏览器打开网页的命令：start chrome  http://www.baidu.com
* */

const {exec} = require ('child_process');
module.exports = function (url) {
  const platform = process.platform;
  if (platform) {
    switch (platform) {
      case "win32"://window
        exec (`start ${url}`);
        break;
      case "darwin"://mac
        exec (`open ${url}`);
    }

  }
};

