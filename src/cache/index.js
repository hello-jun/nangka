/*
* 使用缓存
* 强缓存：
*   cache-control HTTP1.1 优先级高
*   expires HTTP1.0 优先级低
* 强缓存失效的情况下才使用协商缓存
*   etag & if-none-match 优先级高
*   last-modified & if-modified-since 优先级低
* */
const fs = require ('fs');
const {promisify} = require ('util');
const etag = require ('etag');
const stat = promisify (fs.stat);
const {cache} = require ('../../config/config');

async function setHttpCache (response, cacheConfig, sourceUrl) {
  // 文件最后被修改的时间(UTC 格式)
  const mtime = new Date (fs.statSync (sourceUrl).mtime).toUTCString ();
  const body = await stat (sourceUrl);
  if (cacheConfig.expires || cache.expires) {
    response.setHeader ('expires', new Date (Date.now () + (cacheConfig.maxAge||cache.maxAge) * 1000).toUTCString ());
  }
  if (cacheConfig.cacheControl || cache.cacheControl) {
    response.setHeader ('Content-Control', `max-age=${cacheConfig.maxAge||cache.maxAge}`);
  }
  if (cacheConfig.lastModified||cache.lastModified) {
    response.setHeader ('last-modified', mtime)
  }
  if (cacheConfig.etag || cache.etag) {
    // etag 是随机字符串
    response.setHeader ('etag', etag (body));

  }
}

module.exports = async function (request, response, cacheConfig, sourceUrl) {
  setHttpCache (response, cacheConfig, sourceUrl);
  const mtime = new Date (fs.statSync (sourceUrl).mtime).toUTCString ();
  const body = await stat (sourceUrl);
  if (request.headers['if-none-match'] === etag (body) || request.headers["if-modified-since"] === mtime) {
    return true;
  }
  return false;
};


