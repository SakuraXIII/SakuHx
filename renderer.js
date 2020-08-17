// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require("fs");
const { exec } = require("child_process");
document.querySelector("button").onclick = function () {
  let str = fs.readFileSync("./conf.json", { encoding: "utf8" });
  let variable = JSON.parse(str);
  let temp = fs.readdirSync(variable.rootPath, { encoding: "utf8", withFileTypes: false });
  console.log(temp);
  exec("dir",{cwd:__dirname}, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
