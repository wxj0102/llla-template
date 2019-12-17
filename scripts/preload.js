// 拷贝文件...
// 暂时没有想到合适的方案
const fs = require('fs');
const path = require('path');

module.exports = function () {
  var exsits = fs.existsSync(path.join(__dirname, '../dist/preload.js'));
  //为true的话那么存在，如果为false不存在
  if (!exsits) {
    // 拷贝文件
    console.log('here')
    fs.writeFileSync(path.join(__dirname, '../dist/preload.js'), fs.readFileSync(path.join(__dirname, '../public/preload.js')));
  };
}
