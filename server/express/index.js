const { join, extname } = require('path');
const express = require('express');
const { Stream } = require('stream');
const app = express();

const dist = '../../dist';
const root = join(__dirname, dist);

const headerMap = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/jpeg',
};

// Express
app.use(async (req, res) => {
  // 或者从 CDN 上下载到 server 端
  // const serverPath = await downloadServerBundle('http://cdn.com/bar/umi.server.js');
  const render = require(`${dist}/umi.server`);
  const ext = extname(req.url);
  const header = {
    'Content-Type': headerMap[ext] || 'text/html',
  };
  res.setHeader('Content-Type', header);

  const context = {};
  const { html, error, rootContainer } = await render({
    // 有需要可带上 query
    path: req.url,
    context,
    // 可自定义 html 模板
    // htmlTemplate: defaultHtml,
    // 启用流式渲染
    mode: 'stream',
    // html 片段静态标记（适用于静态站点生成）
    // staticMarkup: false,
    // 扩展 getInitialProps 在服务端渲染中的参数
    // getInitialPropsCtx: {},
    // manifest，正常情况下不需要
  });
  // support stream html
  if (html instanceof Stream) {
    html.pipe(res);
    html.on('end', function () {
      res.end();
    });
  } else {
    res.send(res);
  }
});

app.use(express.static(root));

app.listen(7001, () => {
  console.log('server 127.0.0.1:7001');
});
