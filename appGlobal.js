const fs = require("fs");
var config = null;
function init() {
  config = JSON.parse(fs.readFileSync("./conf.json", "utf-8"));
}

init();
exports.config = config;
