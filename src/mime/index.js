const path = require ("path");
const mineType = {
  "css": {
    "ct": "text/css;charset=utf-8",
    "icon": "iconfont icon-css"
  },
  "gif": {
    "ct": "image/gif",
    "icon": "iconfont icon-gif"
  },
  "html": {
    "ct": "text/html;charset=utf-8",
    "icon": "iconfont icon-HTML"
  },
  "ico": {
    "ct": "image/x-icon",
    "icon": "iconfont icon-coat"
  },
  "jpeg": {
    "ct": "image/jpeg",
    "icon": "iconfont icon-JPEG"
  },
  "jpg": {
    "ct": "image/jpeg",
    "icon": "iconfont icon-JPEG"
  },
  "js": {
    "ct": "text/javascrip;charset=utf-8",
    "icon": "iconfont icon-js"
  },
  "json": {
    "ct": "application/json;charset=utf-8",
    "icon": "iconfont icon-json"
  },
  "pdf": {
    "ct": "application/pdf",
    "icon": "iconfont icon-pdf"
  },
  "png": {
    "ct": "image/png",
    "icon": "iconfont icon-png"
  },
  "svg": {
    "ct": "image/svg+xml",
    "icon": "iconfont icon-svg"
  },
  "swf": {
    "ct": "application/x-shockwave-flash",
    "icon": "iconfont icon-SWF"
  },
  "tiff": {
    "ct": "image/tiff",
    "icon": "iconfont icon-tiff"
  },
  "txt": {
    "ct": "text/plain;charset=utf-8",
    "icon": "iconfont icon-txt"
  },
  "wav": {
    "ct": "audio/x-wav",
    "icon": "iconfont icon-WAV"
  },
  "wma": {
    "ct": "audio/x-ms-wma",
    "icon": "iconfont icon-WMA"
  },
  "wmv": {
    "ct": "video/x-ms-wmv",
    "icon": "iconfont icon-WAV"
  },
  "xml": {
    "ct": "text/xml",
    "icon": "iconfont icon-xml"
  },
  "md": {
    "ct": "text/x-markdown;charset=utf-8",
    "icon": "iconfont icon-file-markdown"
  },
};

module.exports = function (pathurl) {
  const ext = path.extname (pathurl).split (".").pop ();
  return mineType[ext.toLowerCase ()]
};
