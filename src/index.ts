// setup mstime to measure API response time
const mstime = require('mstime');

mstime.plugins([{ plugin: require('mstime/dist/cjs/plugins/msPluginTrimMean') }]);
mstime.start('app-start');

const app = require('./config/express');
const { port, env } = require('./config/vars');

const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

app.listen(port, () => {
  console.info(`--- 🌟  Started (${env}) --- https://localhost:${port}`);
  console.log(`${mstime.end('app-start').last} ms`);
});

module.exports = app;
