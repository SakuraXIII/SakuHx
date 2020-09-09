/*
 * @Author: Sakura Sun
 * @Date: 2020-08-30 14:45:45
 * @LastEditTime: 2020-09-09 15:35:14
 * @Description: 设置页
 */

const { readdir } = require("fs");
const { dirname } = require("path");
const { ipcRenderer } = require("electron");
class Setting {
  static instance = null;
  constructor() {
    this.init();
  }
  /**
   * 单例模式写法
   */
  static getInstance() {
    if (this.instance == null) {
      this.instance = new Setting();
    }
    return this.instance;
  }

  init() {
    this.loadConfig();
  }
  /**
   * 加载配置
   */
  loadConfig() {
    document.querySelector("#set_name input").value = App.global.name;
    document.querySelector("#set_avator input").value = App.global.avator;
    document.querySelector("#set_site input").value = App.global.blog;
    document.querySelector("#set_root_path input").value = App.global.rootPath;
    document.querySelector("#set_post_path input").value = App.global.postPath;
    document.querySelector("#set_editor_path input").value = App.global.extraEditor;
    document.querySelector("#set_savetime input").value = App.global.saveTime;
    document.querySelector("#set_isextra input").checked = App.global.openExtra;
    let current_theme = App.global.theme;
    // 异步获取主题列表
    (async () => {
      const files = await this.getTheme();
      files.map(value => {
        document.querySelector("#theme_list").insertAdjacentHTML(
          "beforeend",
          `
      <option value="${value}" ${value == current_theme ? "selected" : ""} >${value}</option>
      `
        );
      });
      this.saveClick();
    })();
  }
  /**
   * 读取主题文件夹下子文件夹,获取主题列表
   */
  getTheme() {
    return new Promise(resolve => {
      readdir(dirname(dirname(__dirname)), (err, files) => {
        if (err) throw err;
        resolve(files);
      });
    });
  }
  /**
   * 保存按钮点击触发事件,
   * 发送ipc消息到主进程,
   * 更新全局共享配置,
   * 在关闭程序时保存到文件
   */
  saveClick() {
    document.querySelector("#set_save").addEventListener("click", () => {
      // 向主进程发送异步消息
      ipcRenderer.send("saveConfig", this.getConfig());
      // 接收主进程的回复消息
      ipcRenderer.on("reply", () => {
        App.showPopup("保存成功");
      });
    });
  }
  /**
   * 获取更改后的配置
   */
  getConfig() {
    let select = document.querySelector("#theme_list");
    let index = select.selectedIndex;
    let obj = {
      theme: select.options[index].text,
      avator: document.querySelector("#set_avator input").value,
      name: document.querySelector("#set_name input").value,
      gitRepo: document.querySelector("#set_gitrepo input").value,
      blog: document.querySelector("#set_site input").value,
      rootPath: document.querySelector("#set_root_path input").value,
      postPath: document.querySelector("#set_post_path input").value,
      extraEditor: document.querySelector("#set_editor_path input").value,
      saveTime:
        document.querySelector("#set_savetime input").value >= 1
          ? document.querySelector("#set_savetime input").value
          : 2,
      openGit: document.querySelector("#set_isgit input").checked,
      openExtra: document.querySelector("#set_isextra input").checked,
    };
    return obj;
  }
}

exports.Setting = Setting;
