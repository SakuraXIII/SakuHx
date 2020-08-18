const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const { config } = require("./appGlobal");
global.mySiteInfo = config;
let mainWindow = null;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭electron安全协议警告
function createWindow() {
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 755,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: false,
    },
    icon: path.join(__dirname, "kiana.png"),
    title: "SakuHx",
    backgroundColor: "#fff",
  });
  mainWindow.loadFile(__dirname + "/theme/" + config.theme + "/index.html");
  mainWindow.webContents.on("did-fail-load", error => {
    console.log(error);
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
