/*
 * @Author: Sakura Sun
 * @Date: 2020-07-26 09:23:18
 * @LastEditTime: 2020-08-31 23:40:32
 * @Description: 入口主文件
 */
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { config } = require("./appGlobal");
const { writeFile } = require("fs");
global.mySiteInfo = config;
let mainWindow = null;
let needSave = false;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭electron安全协议警告
function createWindow() {
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 780,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: false,
    },
    // frame:false,
    icon: path.join(__dirname, "kiana.png"),
    title: "SakuHx",
    backgroundColor: "#fff",
  });
  mainWindow.loadFile(__dirname + "/theme/" + config.theme + "/index.html");
  mainWindow.webContents.on("did-fail-load", error => {
    console.error("加载主题失败，恢复默认主题");
    mainWindow.loadFile("index.html");
  });
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
// 接收渲染进程发送的异步消息
ipcMain.on("saveConfig", (event, args) => {
  global.mySiteInfo = args;
  needSave = true;
  // 对消息进行回复
  event.sender.send("reply", "ok");
});
// 关闭程序前保存更新的配置
app.on("before-quit", () => {
  if (needSave) {
    writeFile("./conf.json", JSON.stringify(global.mySiteInfo), err => {
      if (err) throw err;
    });
  }
});
